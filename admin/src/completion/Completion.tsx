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
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ItemSelect } from "../item/ItemSelect";
import { UserSelect } from "../user/UserSelect";
import { Completion as TCompletion } from "../api/completion/Completion";
import { CompletionUpdateInput } from "../api/completion/CompletionUpdateInput";

export const Completion = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/completions/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TCompletion,
    AxiosError,
    [string, string]
  >(["get-/api/completions", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/completions"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TCompletion, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/completions"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//completions");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TCompletion, AxiosError, CompletionUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/completions"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: CompletionUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.id);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(() => pick(data, ["itemId", "userId"]), [
    data,
  ]);

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
                title={`${"Completion"} ${
                  data?.id && data?.id.length ? data.id : data?.id
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
              <ItemSelect label="Item_id" name="itemId.id" />
            </div>
            <div>
              <UserSelect label="User_id" name="userId.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
