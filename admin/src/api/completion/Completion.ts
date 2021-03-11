import { ItemWhereUniqueInput } from "../item/ItemWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Completion = {
  createdAt: Date;
  id: string;
  itemId?: ItemWhereUniqueInput | null;
  updatedAt: Date;
  userId?: UserWhereUniqueInput | null;
};
