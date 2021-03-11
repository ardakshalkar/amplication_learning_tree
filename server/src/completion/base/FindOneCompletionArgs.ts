import { ArgsType, Field } from "@nestjs/graphql";
import { CompletionWhereUniqueInput } from "./CompletionWhereUniqueInput";

@ArgsType()
class FindOneCompletionArgs {
  @Field(() => CompletionWhereUniqueInput, { nullable: false })
  where!: CompletionWhereUniqueInput;
}

export { FindOneCompletionArgs };
