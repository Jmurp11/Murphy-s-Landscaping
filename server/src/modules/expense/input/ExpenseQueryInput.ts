import { InputType, Field } from "type-graphql";

@InputType()
export class ExpenseQueryInput {
  @Field()
  id: string;
}