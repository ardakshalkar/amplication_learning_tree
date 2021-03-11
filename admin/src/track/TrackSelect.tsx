import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Track } from "../api/track/Track";

type Data = Track[];

type Props = Omit<SelectFieldProps, "options">;

export const TrackSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/tracks",
    async () => {
      const response = await api.get("/api/tracks");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.title && item.title.length ? item.title : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
