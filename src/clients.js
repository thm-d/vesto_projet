import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    ChipField,
    Edit,
    SimpleForm,
    TextInput,
    ReferenceArrayField,
    SingleFieldList,
    Pagination
 } from 'react-admin';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


 const useStyles = makeStyles(theme => ({
    inlineField: {
        display: 'inline-block',
        width: '25%',
        marginRight: '8%',
        minWidth: '200px',
    },
    inline6Field: {
        display: 'inline-block',
        width: '14%',
        marginRight: '3%',
        minWidth: '50px',
    },
    inlineHalfField: {
        display: 'inline-block',
        width: '45%',
        marginRight: '5%',
        minWidth: '300px',
    },
    inline23Field: {
        display: 'inline-block',
        width: '60%',
        marginRight: '6%',
        minWidth: '200px',
    },
    fullWidth: {
        width: '80%',
    },
}));


const clientTransform = (data) => {
    let newData = data;


    // computed fields
    delete data['Fiche hubspot']
    delete data['id']
    delete data['Client']

    return newData
}

const ClientPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const ClientTitle = ({ record }) => {
    return <span>Client {record ? record['Prénom'] + ' ' + record['Nom'] : 'Clients'}</span>;
};

export const CustomClientList = props => (
    <List {...props} perPage={100} pagination={<ClientPagination />} actions={false}>
        <Datagrid rowClick="edit">
            <TextField source="Client" />
            <TextField source="Entreprise" />
            <EmailField source="email" />
            <TextField source="Téléphone" />
            {/* <ReferenceArrayField source="Listes" label='Demandes' reference="listes">
                <SingleFieldList>
                    <ChipField source='Nom'/>
                </SingleFieldList>
            </ReferenceArrayField> */}
        </Datagrid>
    </List>
);

export const ClientEdit = props => {
    const classes = useStyles()
    return(
    <Edit {...props} transform={clientTransform} title={<ClientTitle/>}>
        <SimpleForm>
            <TextInput variant='outlined' formClassName={classes.inlineField} fullWidth source='Nom' />
            <TextInput variant='outlined' formClassName={classes.inlineField} fullWidth source='Prénom' />
            <TextInput variant='outlined' formClassName={classes.inlineField} fullWidth source='Téléphone' />
            <TextInput variant='outlined' multiline formClassName={classes.fullWidth} fullWidth source='Notes' />
            <br />
            <Typography variant='h6'>Toutes les machines du client</Typography>
                <ReferenceArrayField fullWidth source='Machines' reference='machines'>
                    <SingleFieldList>
                        <ChipField source='Type' />
                    </SingleFieldList>
                </ReferenceArrayField>
        </SimpleForm>
    </Edit>)
};