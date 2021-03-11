import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Item } from "../api/item/Item";

type Props = { id: string };

export const ItemTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Item,
    AxiosError,
    [string, string]
  >(["get-/api/items", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/items"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/items"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
