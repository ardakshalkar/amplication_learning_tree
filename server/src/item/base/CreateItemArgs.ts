import { ArgsType, Field } from "@nestjs/graphql";
import { ItemCreateInput } from "./ItemCreateInput";

@ArgsType()
class CreateItemArgs {
  @Field(() => ItemCreateInput, { nullable: false })
  data!: ItemCreateInput;
}

export { CreateItemArgs };
