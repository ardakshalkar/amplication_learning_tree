import { ArgsType, Field } from "@nestjs/graphql";
import { ItemWhereInput } from "./ItemWhereInput";

@ArgsType()
class FindManyItemArgs {
  @Field(() => ItemWhereInput, { nullable: true })
  where?: ItemWhereInput;
}

export { FindManyItemArgs };
