import { Completion } from "../completion/Completion";
import { Track } from "../track/Track";

export type Competence = {
  completions?: Array<Completion>;
  createdAt: Date;
  description: string | null;
  id: string;
  items?: Array<Competence>;
  prerequisites?: Array<Competence>;
  title: string;
  tracks?: Array<Track>;
  updatedAt: Date;
};
