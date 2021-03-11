import { ArgsType, Field } from "@nestjs/graphql";
import { ItemWhereUniqueInput } from "./ItemWhereUniqueInput";
import { ItemUpdateInput } from "./ItemUpdateInput";

@ArgsType()
class UpdateItemArgs {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  where!: ItemWhereUniqueInput;
  @Field(() => ItemUpdateInput, { nullable: false })
  data!: ItemUpdateInput;
}

export { UpdateItemArgs };
