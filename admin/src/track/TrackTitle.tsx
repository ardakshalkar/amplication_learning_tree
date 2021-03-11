import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Track } from "../api/track/Track";

type Props = { id: string };

export const TrackTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Track,
    AxiosError,
    [string, string]
  >(["get-/api/tracks", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/tracks"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/tracks"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
