import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";

import { routes } from "./routes";

const App = () => {
  const { i18n } = useTranslation();

  return (
    <div key={i18n.language}>
      <Switch>
        {routes.map(route => (
          <Route {...route} key={route.path} component={route.component} />
        ))}
      </Switch>
    </div>
  );
};

export default App;
