import { ArgsType, Field } from "@nestjs/graphql";
import { CompletionWhereInput } from "./CompletionWhereInput";

@ArgsType()
class FindManyCompletionArgs {
  @Field(() => CompletionWhereInput, { nullable: true })
  where?: CompletionWhereInput;
}

export { FindManyCompletionArgs };
