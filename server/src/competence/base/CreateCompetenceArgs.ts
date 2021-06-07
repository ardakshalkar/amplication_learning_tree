import { ArgsType, Field } from "@nestjs/graphql";
import { CompetenceCreateInput } from "./CompetenceCreateInput";

@ArgsType()
class CreateCompetenceArgs {
  @Field(() => CompetenceCreateInput, { nullable: false })
  data!: CompetenceCreateInput;
}

export { CreateCompetenceArgs };
