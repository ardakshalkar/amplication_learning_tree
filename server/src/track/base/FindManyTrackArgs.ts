import { ArgsType, Field } from "@nestjs/graphql";
import { TrackWhereInput } from "./TrackWhereInput";

@ArgsType()
class FindManyTrackArgs {
  @Field(() => TrackWhereInput, { nullable: true })
  where?: TrackWhereInput;
}

export { FindManyTrackArgs };
