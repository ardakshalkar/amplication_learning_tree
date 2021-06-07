import { ArgsType, Field } from "@nestjs/graphql";
import { CompetenceWhereUniqueInput } from "./CompetenceWhereUniqueInput";

@ArgsType()
class DeleteCompetenceArgs {
  @Field(() => CompetenceWhereUniqueInput, { nullable: false })
  where!: CompetenceWhereUniqueInput;
}

export { DeleteCompetenceArgs };
