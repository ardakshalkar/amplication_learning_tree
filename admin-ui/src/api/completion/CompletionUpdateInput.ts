import { CompetenceWhereUniqueInput } from "../competence/CompetenceWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompletionUpdateInput = {
  itemId?: CompetenceWhereUniqueInput | null;
  userId?: UserWhereUniqueInput | null;
};
