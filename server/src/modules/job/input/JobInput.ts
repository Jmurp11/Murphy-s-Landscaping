import { InputType, Field } from "type-graphql";

@InputType()
export class JobInput {
  @Field()
  customer: string;

  @Field()
  cost: number;

  @Field()
  jobType!: string;
  
}