import { InputType, Field } from "type-graphql";

@InputType()
export class JobQueryInput {
  @Field()
  id: string;
  
  
}