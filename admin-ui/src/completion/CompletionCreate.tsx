import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CompetenceTitle } from "../competence/CompetenceTitle";
import { UserTitle } from "../user/UserTitle";

export const CompletionCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput
          source="competence.id"
          reference="Competence"
          label="Item_id"
        >
          <SelectInput optionText={CompetenceTitle} />
        </ReferenceInput>
        <ReferenceInput source="user.id" reference="User" label="User_id">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
