import { Completion } from "../completion/Completion";
import { Track } from "../track/Track";

export type User = {
  completions?: Array<Completion>;
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  roles: Array<string>;
  tracks?: Array<Track>;
  updatedAt: Date;
  username: string;
};
