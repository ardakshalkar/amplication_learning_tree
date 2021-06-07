import { ArgsType, Field } from "@nestjs/graphql";
import { TrackWhereUniqueInput } from "./TrackWhereUniqueInput";

@ArgsType()
class TrackFindUniqueArgs {
  @Field(() => TrackWhereUniqueInput, { nullable: false })
  where!: TrackWhereUniqueInput;
}

export { TrackFindUniqueArgs };
