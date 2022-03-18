import { List, Datagrid, TextField, ReferenceArrayField, SingleFieldList, ChipField } from 'react-admin';


export const RefurbisherList = props => (
    <List {...props} perPage={25}>
        <Datagrid rowClick="edit">
            <TextField source="Nom" />
            <TextField source="Statut" />
            <TextField source="Localisation" />
            <ReferenceArrayField source='Machines' reference='machines'>
                <SingleFieldList>
                    <ChipField source='Type' />
                </SingleFieldList>
            </ReferenceArrayField>
        </Datagrid>
    </List>
);