import { CompletionWhereInput } from "./CompletionWhereInput";
import { CompletionOrderByInput } from "./CompletionOrderByInput";

export type CompletionFindManyArgs = {
  where?: CompletionWhereInput;
  orderBy?: CompletionOrderByInput;
  skip?: number;
  take?: number;
};
