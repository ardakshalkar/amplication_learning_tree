import { Competence } from "../competence/Competence";
import { User } from "../user/User";

export type Completion = {
  createdAt: Date;
  id: string;
  itemId?: Competence | null;
  updatedAt: Date;
  userId?: User | null;
};
