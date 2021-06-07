import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CompetenceTitle } from "../competence/CompetenceTitle";
import { UserTitle } from "../user/UserTitle";

export const CompletionEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
