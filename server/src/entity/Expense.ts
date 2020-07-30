import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Job } from './Job';

@Entity('expenses')
@ObjectType()
export class Expense extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field()
    @Column('float')
    cost!: number;

    @ManyToOne(() => Job,  {
        eager: true
    })
    @Field(() => Job, { nullable: true } )
    @Column('uuid', { nullable: true })
    job!: string;

    @Field(() => String)
    @Column('text')
    expenseType!: string;

}
