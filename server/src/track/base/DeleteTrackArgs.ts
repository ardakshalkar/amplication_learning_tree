import { ArgsType, Field } from "@nestjs/graphql";
import { TrackWhereUniqueInput } from "./TrackWhereUniqueInput";

@ArgsType()
class DeleteTrackArgs {
  @Field(() => TrackWhereUniqueInput, { nullable: false })
  where!: TrackWhereUniqueInput;
}

export { DeleteTrackArgs };
