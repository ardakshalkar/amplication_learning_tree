import { ArgsType, Field } from "@nestjs/graphql";
import { ItemWhereUniqueInput } from "./ItemWhereUniqueInput";

@ArgsType()
class DeleteItemArgs {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  where!: ItemWhereUniqueInput;
}

export { DeleteItemArgs };
