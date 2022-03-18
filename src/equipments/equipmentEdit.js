import React from "react";
import {
  TextInput,
  SingleFieldList,
  ReferenceArrayField,
  ChipField,
  Edit,
  SelectInput,
  SimpleForm,
  NumberInput,
} from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, DeleteButton, SaveButton } from "react-admin";
import { Typography } from "@material-ui/core";

//import { equipmentTransform } from '../equipments old/equipmentEdit';

const EquipmentTitle = ({ record }) => {
  return <span>{record ? record["Type"] : ""}</span>;
};

const useStyles = makeStyles((theme) => ({
  inlineField: {
    display: "inline-block",
    width: "25%",
    marginRight: "8%",
    minWidth: "200px",
  },
  inline6Field: {
    display: "inline-block",
    width: "14%",
    marginRight: "3%",
    minWidth: "50px",
  },
  inlineHalfField: {
    display: "inline-block",
    width: "45%",
    marginRight: "5%",
    minWidth: "300px",
  },
  inline23Field: {
    display: "inline-block",
    width: "60%",
    marginRight: "6%",
    minWidth: "200px",
  },
  fullWidth: {
    width: "80%",
  },
  red: {
    fontWeight: "bold",
    color: "red",
  },
  green: {
    fontWeight: "bold",
    color: "green",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  list: {
    display: "flex",
    listStyleType: "none",
  },
  image: {
    margin: "0.5rem",
    maxHeight: "15rem",
  },
}));

export const equipmentStatusChoices = [
  { id: "En attente de relecture", name: "En attente de relecture" },
  { id: "Sur E-shop", name: "Sur E-shop" },
  { id: "Disponible", name: "Disponible" },
  { id: "Réservé", name: "Réservé" },
];

const equipmentTransform = (data) => {
  let newData = data;
  delete newData["id"];
  return newData;
};

const EquipmentProcessingActions = (props) => {
  return (
    <Toolbar {...props} classes={useStyles()}>
      <SaveButton
        label="Enregistrer"
        redirect={false}
        disabled={props.pristine}
      />
      <DeleteButton label="Supprimer" />
    </Toolbar>
  );
};

export const EquipmentEdit = (props) => {
  const classes = useStyles();
  return (
    <Edit
      {...props}
      title={<EquipmentTitle />}
      undoable={false}
      transform={equipmentTransform}
    >
      <SimpleForm
        variant="outlined"
        warnWhenUnsavedChanges
        {...props}
        toolbar={<EquipmentProcessingActions {...props} />}
      >
        <TextInput
          source="Type"
          fullWidth
          formClassName={classes.inline23Field}
        />
        <ReferenceArrayField
          source="Reconditionneur"
          reference="reconditionneurs"
          formClassName={classes.inlineField}
        >
          <SingleFieldList>
            <ChipField source="Nom" />
          </SingleFieldList>
        </ReferenceArrayField>
        <Typography variant="h6">Caractéristiques</Typography>
        <TextInput source="Marque" formClassName={classes.inlineField} />
        <TextInput source="Modele" formClassName={classes.inlineField} />
        <SelectInput
          source="Statut"
          choices={equipmentStatusChoices}
          optionText="name"
          formClassName={classes.inlineField}
        />
        <TextInput source="Année" formClassName={classes.inlineField} />
        <NumberInput
          label="Prix HT"
          source="Prix HT"
          formClassName={classes.inlineField}
        />
        <TextInput source="Dimensions" formClassName={classes.inlineField} />
        <TextInput source="Capacité" formClassName={classes.inlineField} />
        <TextInput source="Puissance" formClassName={classes.inlineField} />
        <TextInput source="Poids" formClassName={classes.inlineField} />
        <TextInput source="Alimentation" formClassName={classes.inlineField} />
        <TextInput
          multiline
          fullWidth
          source="Lien"
          formClassName={classes.fullWidth}
        />
      </SimpleForm>
    </Edit>
  );
};
