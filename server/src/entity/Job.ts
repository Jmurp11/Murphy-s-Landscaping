import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { User } from './User';
import { Expense } from './Expense';

@Entity('jobs')
@ObjectType()
export class Job extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field(() => User)
    @ManyToOne(() => User, customer => customer.id)
    @Column('text')
    customer!: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, employee => employee.id)
    @Column('text', { nullable: true })
    employee: string;

    @Field()
    @Column('boolean', { default: false })
    isComplete!: boolean;

    @Field()
    @Column('boolean', { default: false })
    isPaid!: boolean;

    @Field(() => Date)
    @Column('timestamp')
    dateRequested!: string;

    @Field(() => Date, { nullable: true })
    @Column('timestamp', { nullable: true })
    dateCompleted!: string;

    @Field()
    @Column('float')
    cost!: number;

    @Field(() => Date, { nullable: true })
    @Column('timestamp', { nullable: true })
    datePaid!: string;

    @Field(() => String)
    @Column('text')
    jobType!: string;

    @Field(() => [Expense], { nullable: true })
    @OneToMany(() => Expense, expenses => expenses.job)
    expenses: Expense[];
}
