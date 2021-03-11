import { ArgsType, Field } from "@nestjs/graphql";
import { CompletionWhereUniqueInput } from "./CompletionWhereUniqueInput";

@ArgsType()
class DeleteCompletionArgs {
  @Field(() => CompletionWhereUniqueInput, { nullable: false })
  where!: CompletionWhereUniqueInput;
}

export { DeleteCompletionArgs };
