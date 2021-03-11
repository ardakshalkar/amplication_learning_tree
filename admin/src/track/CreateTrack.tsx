import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ItemSelect } from "../item/ItemSelect";
import { UserSelect } from "../user/UserSelect";
import { Track } from "../api/track/Track";
import { TrackCreateInput } from "../api/track/TrackCreateInput";

const INITIAL_VALUES = {} as TrackCreateInput;

export const CreateTrack = (): React.ReactElement => {
  useBreadcrumbs("/tracks/new", "Create Track");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Track,
    AxiosError,
    TrackCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/tracks", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/tracks"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TrackCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Track"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
