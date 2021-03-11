import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ItemSelect } from "../item/ItemSelect";
import { UserSelect } from "../user/UserSelect";
import { Track as TTrack } from "../api/track/Track";
import { TrackUpdateInput } from "../api/track/TrackUpdateInput";

export const Track = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/tracks/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TTrack,
    AxiosError,
    [string, string]
  >(["get-/api/tracks", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/tracks"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TTrack, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/tracks"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//tracks");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TTrack, AxiosError, TrackUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/tracks"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: TrackUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.title);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, ["description", "item", "learningOutcome", "title", "user"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Track"} ${
                  data?.title && data?.title.length ? data.title : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField label="Description" name="description" textarea />
            </div>
            <div>
              <ItemSelect label="Item" name="item.id" />
            </div>
            <div>
              <TextField label="Learning outcome" name="learningOutcome" />
            </div>
            <div>
              <TextField label="Title" name="title" />
            </div>
            <div>
              <UserSelect label="User" name="user.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
