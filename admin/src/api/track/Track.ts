import { ItemWhereUniqueInput } from "../item/ItemWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Track = {
  createdAt: Date;
  description: string | null;
  id: string;
  item?: ItemWhereUniqueInput | null;
  learningOutcome: string | null;
  title: string | null;
  updatedAt: Date;
  user?: UserWhereUniqueInput | null;
};
