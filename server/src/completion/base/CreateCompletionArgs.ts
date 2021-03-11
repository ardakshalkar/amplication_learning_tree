import { ArgsType, Field } from "@nestjs/graphql";
import { CompletionCreateInput } from "./CompletionCreateInput";

@ArgsType()
class CreateCompletionArgs {
  @Field(() => CompletionCreateInput, { nullable: false })
  data!: CompletionCreateInput;
}

export { CreateCompletionArgs };
