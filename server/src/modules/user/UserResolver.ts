import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import { User } from "../../entity/User";
import { RegisterInput } from "./input/RegisterInput";
import { Result } from "../../shared/Result";
import { sendEmail } from "../../utils/sendEmails";
import { registerSuccess, loginFailed, confirmEmailError, forgotPasswordLockError } from "./messages/messages";
import { createConfirmationUrl } from "../../utils/createConfirmationUrl";
import { LoginResult } from "./types/LoginResult";
import { MyContext } from "../../shared/MyContext";
import { sendRefreshToken } from "../../shared/sendRefreshToken";
import { createRefreshToken, createAccessToken } from "../../shared/auth";
import { redis } from "../../redis";
import { confirmationPrefix, forgotPasswordPrefix, baseUrl } from "../../constants";
import { ChangePasswordInput } from "./input/ChangePasswordInput";
import { LoginInput } from "./input/LoginInput";
import { isAuth } from "../../middleware/isAuth";
import { isEmployee } from "../../middleware/isEmployee";
import { logger } from "../../middleware/logger";
import { UserInput } from "./input/UserInput";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find({
      relations: [
        'address'
      ]
    });
  }

  @Query(() => [User])
  async customers() {
    return User.find({
      relations: [
        'address'
      ],
      where: {
        role: 'Customer'
      }
    });
  }

  @Query(() => [User])
  async employees() {
    return User.find({
      relations: [
        'address'
      ],
      where: {
        role: 'Employee'
      }
    });
  }

  @Query(() => User)
  async user(@Arg("input") {
    id
  }: UserInput) {
    return User.findOne({
      relations: [
        'address'
      ],
      where: {
        id
      }
    });
  }

  @Mutation(() => Result)
  async register(@Arg("input")
  {
    email,
    password,
    firstName,
    lastName,
    phone,
    role
  }: RegisterInput): Promise<Result> {
    const creationTime = new Date().toISOString();

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
      creationTime
    }).save();

    await sendEmail(email, await createConfirmationUrl(user.id), 'Confirm');

    return {
      success: [
        {
          path: 'register',
          message: registerSuccess
        }
      ]
    }
  }

  @Mutation(() => LoginResult, { nullable: true })
  async login(
    @Arg('input') { email, password }: LoginInput,
    @Ctx() { res }: MyContext
  ): Promise<LoginResult> {
    let user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return {
        errors: [
          {
            path: 'login',
            message: loginFailed
          }
        ]
      }
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return {
        errors: [
          {
            path: 'login',
            message: loginFailed
          }
        ]
      }
    }

    if (!user.confirmed) {
      return {
        errors: [
          {
            path: 'login',
            message: confirmEmailError
          }
        ]
      }
    }

    if (user.forgotPasswordLock) {
      return {
        errors: [
          {
            path: 'login',
            message: forgotPasswordLockError
          }
        ]
      }
    }

    user = await User.findOne({
      where: {
        email
      }
    });

    sendRefreshToken(res, createRefreshToken(user!));

    return {
      success: {
        user,
        accessToken: createAccessToken(user!),
        expiresIn: 3600
      }
    };
  }

  @Mutation(() => Result)
  async confirmUser(
    @Arg('token') token: string
  ): Promise<Result> {
    const userId = await redis.get(`${confirmationPrefix}${token}`);

    if (!userId) {
      return {
        errors: [
          {
            path: 'confirm user',
            message: 'User not found in store!'
          }
        ]
      }
    }

    await User.update({ id: userId }, { confirmed: true });

    await redis.del(token);

    return {
      success: [
        {
          path: 'confirm user',
          message: 'User confirmed!'
        }
      ]
    }
  }

  @Mutation(() => Result)
  async forgotPassword(
    @Arg('email') email: string
  ): Promise<Result> {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return {
        errors: [
          {
            path: 'forgot password',
            message: 'User not found!'
          }
        ]
      }
    }

    await User.update({ email }, { forgotPasswordLock: true });

    const token = v4();
    await redis.set(`${forgotPasswordPrefix}${token}`, user.id, "ex", 60 * 60 * 24) // 1 day expiration

    await sendEmail(email, `${baseUrl}/a/change-password/${token}`, 'Forgot Password');

    return {
      success: [
        {
          path: 'forgot password',
          message: 'Check email for a link to reset your password!'
        }
      ]
    }
  }

  @Mutation(() => Result)
  async changePassword(
    @Arg('input') { token, password }: ChangePasswordInput
  ): Promise<Result> {
    const userId = await redis.get(`${forgotPasswordPrefix}${token}`);

    if (!userId) {
      return {
        errors: [
          {
            path: 'change password',
            message: 'User not found or bad token!'
          }
        ]
      }
    }

    const user = await User.findOne({
      where: {
        id: userId
      }
    })

    if (!user) {
      return {
        errors: [
          {
            path: 'change password',
            message: 'User not found!'
          }
        ]
      }
    }

    await redis.del(`${forgotPasswordPrefix}${token}`);

    user.password = await bcrypt.hash(password, 12);

    user.save();

    await User.update({ id: userId }, { forgotPasswordLock: false });

    return {
      success: [
        {
          path: 'change password',
          message: 'Password updated successfully!'
        }
      ]
    }
  }

  @Mutation(() => Boolean)
  async logout(
    @Ctx() { res }: MyContext
  ) {
    sendRefreshToken(res, "");

    return true;
  };

  @UseMiddleware(isAuth, isEmployee, logger)
  @Mutation(() => Result)
  async deleteUser(@Arg("id") id: string): Promise<Result> {
    const user = await User.findOne({
      where: {
        id
      }
    });

    if (!user) {
      {
        errors: [
          {
            path: 'delete user',
            message: 'User not found!'
          }
        ]
      }
    }

    await User.delete({ id });

    return {
      success: [
        {
          path: 'delete user',
          message: 'User deleted successfully!'
        }
      ]
    }
  }
}
