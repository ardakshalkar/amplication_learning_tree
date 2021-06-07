import { CompetenceWhereUniqueInput } from "../competence/CompetenceWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TrackUpdateInput = {
  description?: string | null;
  item?: CompetenceWhereUniqueInput | null;
  learningOutcome?: string | null;
  title?: string | null;
  user?: UserWhereUniqueInput | null;
};
