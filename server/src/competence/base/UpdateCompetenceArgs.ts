import { ArgsType, Field } from "@nestjs/graphql";
import { CompetenceWhereUniqueInput } from "./CompetenceWhereUniqueInput";
import { CompetenceUpdateInput } from "./CompetenceUpdateInput";

@ArgsType()
class UpdateCompetenceArgs {
  @Field(() => CompetenceWhereUniqueInput, { nullable: false })
  where!: CompetenceWhereUniqueInput;
  @Field(() => CompetenceUpdateInput, { nullable: false })
  data!: CompetenceUpdateInput;
}

export { UpdateCompetenceArgs };
