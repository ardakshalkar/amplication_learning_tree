import { Competence } from "../competence/Competence";
import { User } from "../user/User";

export type Track = {
  createdAt: Date;
  description: string | null;
  id: string;
  item?: Competence | null;
  learningOutcome: string | null;
  title: string | null;
  updatedAt: Date;
  user?: User | null;
};
