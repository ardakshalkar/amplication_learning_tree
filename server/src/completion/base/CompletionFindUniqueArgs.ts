import { ArgsType, Field } from "@nestjs/graphql";
import { CompletionWhereUniqueInput } from "./CompletionWhereUniqueInput";

@ArgsType()
class CompletionFindUniqueArgs {
  @Field(() => CompletionWhereUniqueInput, { nullable: false })
  where!: CompletionWhereUniqueInput;
}

export { CompletionFindUniqueArgs };
