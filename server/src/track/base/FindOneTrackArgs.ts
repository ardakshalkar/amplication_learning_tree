import { ArgsType, Field } from "@nestjs/graphql";
import { TrackWhereUniqueInput } from "./TrackWhereUniqueInput";

@ArgsType()
class FindOneTrackArgs {
  @Field(() => TrackWhereUniqueInput, { nullable: false })
  where!: TrackWhereUniqueInput;
}

export { FindOneTrackArgs };
