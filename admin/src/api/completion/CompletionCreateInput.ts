import { ItemWhereUniqueInput } from "../item/ItemWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompletionCreateInput = {
  itemId?: ItemWhereUniqueInput | null;
  userId?: UserWhereUniqueInput | null;
};
