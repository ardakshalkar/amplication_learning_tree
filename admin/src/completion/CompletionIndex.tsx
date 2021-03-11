import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CompletionList } from "./CompletionList";
import { CreateCompletion } from "./CreateCompletion";
import { Completion } from "./Completion";

export const CompletionIndex = (): React.ReactElement => {
  useBreadcrumbs("/completions/", "Completions");

  return (
    <Switch>
      <PrivateRoute exact path={"/completions/"} component={CompletionList} />
      <PrivateRoute path={"/completions/new"} component={CreateCompletion} />
      <PrivateRoute path={"/completions/:id"} component={Completion} />
    </Switch>
  );
};
