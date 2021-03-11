import { ItemWhereUniqueInput } from "../item/ItemWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompletionUpdateInput = {
  itemId?: ItemWhereUniqueInput | null;
  userId?: UserWhereUniqueInput | null;
};
