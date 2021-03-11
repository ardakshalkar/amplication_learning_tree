import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TrackList } from "./TrackList";
import { CreateTrack } from "./CreateTrack";
import { Track } from "./Track";

export const TrackIndex = (): React.ReactElement => {
  useBreadcrumbs("/tracks/", "Tracks");

  return (
    <Switch>
      <PrivateRoute exact path={"/tracks/"} component={TrackList} />
      <PrivateRoute path={"/tracks/new"} component={CreateTrack} />
      <PrivateRoute path={"/tracks/:id"} component={Track} />
    </Switch>
  );
};
