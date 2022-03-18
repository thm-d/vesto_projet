import {
  List,
  Datagrid,
  TextField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";

export const customersList = (props) => (
  <List {...props} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="Nom" />
      <TextField source="Prénom" />
      <TextField source="Date de création" />
      <ReferenceArrayField source="Machines achetées" reference="clients">
        <SingleFieldList>
          <ChipField source="Type" />
        </SingleFieldList>
      </ReferenceArrayField>
    </Datagrid>
  </List>
);
