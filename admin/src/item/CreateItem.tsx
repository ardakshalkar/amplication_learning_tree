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
import { Item } from "../api/item/Item";
import { ItemCreateInput } from "../api/item/ItemCreateInput";

const INITIAL_VALUES = {} as ItemCreateInput;

export const CreateItem = (): React.ReactElement => {
  useBreadcrumbs("/items/new", "Create Item");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Item,
    AxiosError,
    ItemCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/items", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/items"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ItemCreateInput) => {
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
            <FormHeader title={"Create Item"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Description" name="description" />
          </div>
          <div>
            <TextField label="Title" name="title" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
