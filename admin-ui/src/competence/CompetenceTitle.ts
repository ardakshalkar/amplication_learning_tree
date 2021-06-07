import { Competence as TCompetence } from "../api/competence/Competence";

export const COMPETENCE_TITLE_FIELD = "title";

export const CompetenceTitle = (record: TCompetence) => {
  return record.title;
};
