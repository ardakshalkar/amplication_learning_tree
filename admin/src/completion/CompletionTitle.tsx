import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Completion } from "../api/completion/Completion";

type Props = { id: string };

export const CompletionTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Completion,
    AxiosError,
    [string, string]
  >(["get-/api/completions", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/completions"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/completions"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
