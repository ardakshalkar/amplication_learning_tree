import { CompetenceWhereUniqueInput } from "../competence/CompetenceWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CompletionCreateInput = {
  itemId?: CompetenceWhereUniqueInput | null;
  userId?: UserWhereUniqueInput | null;
};
