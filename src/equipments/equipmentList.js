import * as React from "react";
import {
  Datagrid,
  TextField,
  List,
  ReferenceArrayField,
  ChipField,
  SingleFieldList,
} from "react-admin";

export const EquipmentList = (props) => (
  <List {...props} perPage={25}>
    <Datagrid {...props} rowClick="edit">
      <TextField source="Type" />
      <TextField source="Marque" />
      <TextField source="Modele" />
      <TextField source="Prix HT" />
      <ReferenceArrayField
        source="Reconditionneur"
        reference="reconditionneurs"
      >
        <SingleFieldList>
          <ChipField source="Nom" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ChipField source="Statut" />
    </Datagrid>
  </List>
);
