import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Expense } from './Expense';

@Entity('expensetypes')
@ObjectType()
export class ExpenseType extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field()
    @Column('text')
    title!: string;

    @Field()
    @Column('text')
    description!: string;
}
