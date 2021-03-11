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
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ItemSelect } from "../item/ItemSelect";
import { UserSelect } from "../user/UserSelect";
import { Completion } from "../api/completion/Completion";
import { CompletionCreateInput } from "../api/completion/CompletionCreateInput";

const INITIAL_VALUES = {} as CompletionCreateInput;

export const CreateCompletion = (): React.ReactElement => {
  useBreadcrumbs("/completions/new", "Create Completion");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Completion,
    AxiosError,
    CompletionCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/completions", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/completions"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: CompletionCreateInput) => {
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
            <FormHeader title={"Create Completion"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
