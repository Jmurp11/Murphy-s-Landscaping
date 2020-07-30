import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ObjectType, Field, Root } from 'type-graphql';
import { Address } from './Address';


@Entity('users')
@ObjectType()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field({ nullable: true })
    @Column('varchar', { length: 255 })
    email!: string;

    @Field()
    @Column('text')
    password!: string;

    @Field({ nullable: true })
    @Column('text')
    firstName!: string;

    @Field({ nullable: true })
    @Column('text')
    lastName!: string;

    @Field({ nullable: true })
    fullName(@Root() parent: User): string {
      return `${parent.firstName} ${parent.lastName}`;
    }
  
    @Field({ nullable: true })
    initialName(@Root() parent: User): string {
      return `${parent.firstName.substring(0, 1)}. ${parent.lastName}`;
    }
    
    @Field({ nullable: true })
    @Column('text')
    phone!: string;

    @Field(() => [Address], { nullable: true })
    @OneToMany(() => Address, address => address.user, {
        eager: true
    })
    @Column('text', { nullable: true })
    address: Address;

    @Field(() => String, { nullable: true })
    @Column('text')
    role: string;

    @Field({ nullable: true })
    @Column('boolean', { default: false })
    confirmed!: boolean;

    @Field({ nullable: true })
    @Column('int', { default: 0 })
    tokenVersion: number;
    
    @Field({ nullable: true })
    @Column('boolean', { default: false })
    forgotPasswordLock!: boolean;

    @Field(() => Date, { nullable: true })
    @Column('timestamp')
    creationTime!: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }
}
