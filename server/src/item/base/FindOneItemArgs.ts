import { ArgsType, Field } from "@nestjs/graphql";
import { ItemWhereUniqueInput } from "./ItemWhereUniqueInput";

@ArgsType()
class FindOneItemArgs {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  where!: ItemWhereUniqueInput;
}

export { FindOneItemArgs };
