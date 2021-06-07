import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ListProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import { COMPETENCE_TITLE_FIELD } from "../competence/CompetenceTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";

export const TrackShow = (props: ListProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="Description" source="description" />
        <TextField label="ID" source="id" />
        <ReferenceField
          label="Item"
          source="competence.id"
          reference="Competence"
        >
          <TextField source={COMPETENCE_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Learning outcome" source="learningOutcome" />
        <TextField label="Title" source="title" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceField label="User" source="user.id" reference="User">
          <TextField source={USER_TITLE_FIELD} />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
};
