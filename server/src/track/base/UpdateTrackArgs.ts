import { ArgsType, Field } from "@nestjs/graphql";
import { TrackWhereUniqueInput } from "./TrackWhereUniqueInput";
import { TrackUpdateInput } from "./TrackUpdateInput";

@ArgsType()
class UpdateTrackArgs {
  @Field(() => TrackWhereUniqueInput, { nullable: false })
  where!: TrackWhereUniqueInput;
  @Field(() => TrackUpdateInput, { nullable: false })
  data!: TrackUpdateInput;
}

export { UpdateTrackArgs };
