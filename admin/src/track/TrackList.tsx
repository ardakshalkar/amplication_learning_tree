import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
} from "@amplication/design-system";

import { ItemTitle } from "../item/ItemTitle";
import { UserTitle } from "../user/UserTitle";
import { Track } from "../api/track/Track";

type Data = Track[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "description",
    title: "Description",
    sortable: false,
  },
  {
    name: "item",
    title: "Item",
    sortable: false,
  },
  {
    name: "learningOutcome",
    title: "Learning outcome",
    sortable: false,
  },
  {
    name: "title",
    title: "Title",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
  {
    name: "user",
    title: "User",
    sortable: false,
  },
];

export const TrackList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/tracks",
    async () => {
      const response = await api.get("/api/tracks");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Tracks"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/tracks/new"}>
            <Button>Create Track </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Track) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/tracks"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.description}</>
                </DataGridCell>
                <DataGridCell>
                  <ItemTitle id={item.item?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.learningOutcome}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.title}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.user?.id} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
