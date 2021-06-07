import { Track as TTrack } from "../api/track/Track";

export const TRACK_TITLE_FIELD = "title";

export const TrackTitle = (record: TTrack) => {
  return record.title;
};
