import { ArgsType, Field } from "@nestjs/graphql";
import { CompetenceWhereUniqueInput } from "./CompetenceWhereUniqueInput";

@ArgsType()
class CompetenceFindUniqueArgs {
  @Field(() => CompetenceWhereUniqueInput, { nullable: false })
  where!: CompetenceWhereUniqueInput;
}

export { CompetenceFindUniqueArgs };
