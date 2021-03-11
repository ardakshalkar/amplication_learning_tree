import { ItemWhereUniqueInput } from "../item/ItemWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompletionWhereInput = {
  createdAt?: Date;
  id?: string;
  itemId?: ItemWhereUniqueInput | null;
  updatedAt?: Date;
  userId?: UserWhereUniqueInput | null;
};
