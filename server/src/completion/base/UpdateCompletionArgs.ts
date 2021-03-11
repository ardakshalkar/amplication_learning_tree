import { ArgsType, Field } from "@nestjs/graphql";
import { CompletionWhereUniqueInput } from "./CompletionWhereUniqueInput";
import { CompletionUpdateInput } from "./CompletionUpdateInput";

@ArgsType()
class UpdateCompletionArgs {
  @Field(() => CompletionWhereUniqueInput, { nullable: false })
  where!: CompletionWhereUniqueInput;
  @Field(() => CompletionUpdateInput, { nullable: false })
  data!: CompletionUpdateInput;
}

export { UpdateCompletionArgs };
