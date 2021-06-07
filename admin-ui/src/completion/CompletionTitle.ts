import { Completion as TCompletion } from "../api/completion/Completion";

export const COMPLETION_TITLE_FIELD = "id";

export const CompletionTitle = (record: TCompletion) => {
  return record.id;
};
