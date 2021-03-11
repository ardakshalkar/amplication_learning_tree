import { ItemWhereUniqueInput } from "../item/ItemWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TrackUpdateInput = {
  description?: string | null;
  item?: ItemWhereUniqueInput | null;
  learningOutcome?: string | null;
  title?: string | null;
  user?: UserWhereUniqueInput | null;
};
