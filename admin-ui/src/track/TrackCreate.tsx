import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CompetenceTitle } from "../competence/CompetenceTitle";
import { UserTitle } from "../user/UserTitle";

export const TrackCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Description" multiline source="description" />
        <ReferenceInput
          source="competence.id"
          reference="Competence"
          label="Item"
        >
          <SelectInput optionText={CompetenceTitle} />
        </ReferenceInput>
        <TextInput label="Learning outcome" source="learningOutcome" />
        <TextInput label="Title" source="title" />
        <ReferenceInput source="user.id" reference="User" label="User">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
