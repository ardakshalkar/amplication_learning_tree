import { ArgsType, Field } from "@nestjs/graphql";
import { TrackCreateInput } from "./TrackCreateInput";

@ArgsType()
class CreateTrackArgs {
  @Field(() => TrackCreateInput, { nullable: false })
  data!: TrackCreateInput;
}

export { CreateTrackArgs };
