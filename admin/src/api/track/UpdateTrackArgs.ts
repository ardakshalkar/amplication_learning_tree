import { TrackWhereUniqueInput } from "./TrackWhereUniqueInput";
import { TrackUpdateInput } from "./TrackUpdateInput";

export type UpdateTrackArgs = {
  where: TrackWhereUniqueInput;
  data: TrackUpdateInput;
};
