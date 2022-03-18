import * as React from "react";
import { Admin, Resource } from "react-admin";
import customDataProvider from "./dataProvider";
import { EquipmentList } from "./equipments/equipmentList";
import { EquipmentEdit } from "./equipments/equipmentEdit";

import { RefurbisherList } from "./refurbisher/refurbisherList";
import { customersList } from "./customers/customersList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import CachedIcon from "@mui/icons-material/Cached";

const dataProvider = customDataProvider(
  "https://api.airtable.com/v0/appp0agVAiPE5Etz7"
);

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="machines"
      options={{ label: "Stock" }}
      icon={ViewModuleIcon}
      list={EquipmentList}
      edit={EquipmentEdit}
    />
    <Resource
      name="reconditionneurs"
      list={RefurbisherList}
      icon={CachedIcon}
    />
    <Resource
      name="clients"
      options={{ label: "Clients" }}
      list={customersList}
    />
  </Admin>
);

export default App;
