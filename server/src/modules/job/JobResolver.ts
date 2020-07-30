import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { Job } from '../../entity/Job';
import { JobInput } from './input/JobInput';
import { isEmployee } from '../../middleware/isEmployee';
import { isAuth } from '../../middleware/isAuth';
import { logger } from '../../middleware/logger';
import { Result } from '../../shared/Result';
import { JobQueryInput } from './input/JobQueryInput';

@Resolver()
export class JobResolver {
  @UseMiddleware(logger)
  @Query(() => [Job])
  async jobs() {
    return Job.find({
      relations: ['customer', 'employee', 'expenses']
    });
  }

  @UseMiddleware(logger)
  @Query(() => [Job])
  async jobsByCustomer(customer: string) {
    return Job.find({
      relations: ['customer', 'employee', 'expenses'],
      where: {
        customer
      }
    });
  }

  @UseMiddleware(logger)
  @Query(() => Job)
  async job(@Arg('input') {
    id
   }: JobQueryInput) {
    return Job.findOne({
      relations: ['customer', 'employee', 'expenses'],
      where: {
        id
      }
    });
  }

  @Mutation(() => Result)
  @UseMiddleware(isAuth, logger)
  async createJob(@Arg('input')
  {
    customer,
    employee,
    cost,
    jobType
  }: JobInput): Promise<Result> {
    const dateRequested = new Date().toISOString();

    await Job.create({
      customer,
      employee,
      cost,
      jobType,
      dateRequested
    }).save();

    return {
      success: [
        {
          path: 'create job',
          message: `${jobType} job for Customer ${customer} created successfully`
        }
      ]
    }
  }

  @UseMiddleware(isAuth, isEmployee, logger)
  @Mutation(() => Result)
  async deleteJob(@Arg('id') id: string): Promise<Result> {
    const job = await Job.findOne({
      where: {
        id
      }
    });

    if (!job) {
      errors: [
        {
          path: 'delete job',
          message: `Job could not be deleted`
        }
      ]
    }

    await Job.delete({ id });

    return {
      success: [
        {
          path: 'delete job',
          message: `Job deleted successfully`
        }
      ]
    }
  }
}
