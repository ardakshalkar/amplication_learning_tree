import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import basicHttpAuthProvider from "./auth-provider/ra-auth-basic-http";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { CompetenceList } from "./competence/CompetenceList";
import { CompetenceCreate } from "./competence/CompetenceCreate";
import { CompetenceEdit } from "./competence/CompetenceEdit";
import { CompetenceShow } from "./competence/CompetenceShow";
import { CompletionList } from "./completion/CompletionList";
import { CompletionCreate } from "./completion/CompletionCreate";
import { CompletionEdit } from "./completion/CompletionEdit";
import { CompletionShow } from "./completion/CompletionShow";
import { TrackList } from "./track/TrackList";
import { TrackCreate } from "./track/TrackCreate";
import { TrackEdit } from "./track/TrackEdit";
import { TrackShow } from "./track/TrackShow";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"Competence Tree"}
        dataProvider={dataProvider}
        authProvider={basicHttpAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="Competence"
          list={CompetenceList}
          edit={CompetenceEdit}
          create={CompetenceCreate}
          show={CompetenceShow}
        />
        <Resource
          name="Completion"
          list={CompletionList}
          edit={CompletionEdit}
          create={CompletionCreate}
          show={CompletionShow}
        />
        <Resource
          name="Track"
          list={TrackList}
          edit={TrackEdit}
          create={TrackCreate}
          show={TrackShow}
        />
      </Admin>
    </div>
  );
};

export default App;
