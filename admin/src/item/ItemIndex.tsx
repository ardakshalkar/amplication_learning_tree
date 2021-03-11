import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ItemList } from "./ItemList";
import { CreateItem } from "./CreateItem";
import { Item } from "./Item";

export const ItemIndex = (): React.ReactElement => {
  useBreadcrumbs("/items/", "Items");

  return (
    <Switch>
      <PrivateRoute exact path={"/items/"} component={ItemList} />
      <PrivateRoute path={"/items/new"} component={CreateItem} />
      <PrivateRoute path={"/items/:id"} component={Item} />
    </Switch>
  );
};
