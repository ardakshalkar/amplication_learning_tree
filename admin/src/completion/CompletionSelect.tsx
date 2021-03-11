import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Completion } from "../api/completion/Completion";

type Data = Completion[];

type Props = Omit<SelectFieldProps, "options">;

export const CompletionSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/completions",
    async () => {
      const response = await api.get("/api/completions");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.id && item.id.length ? item.id : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
