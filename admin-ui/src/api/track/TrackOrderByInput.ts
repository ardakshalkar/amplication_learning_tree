import { SortOrder } from "../../util/SortOrder";

export type TrackOrderByInput = {
  createdAt?: SortOrder;
  description?: SortOrder;
  id?: SortOrder;
  itemId?: SortOrder;
  learningOutcome?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
};
