import { TrackWhereInput } from "./TrackWhereInput";
import { TrackOrderByInput } from "./TrackOrderByInput";

export type TrackFindManyArgs = {
  where?: TrackWhereInput;
  orderBy?: TrackOrderByInput;
  skip?: number;
  take?: number;
};
