import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import { createBrowserHistory } from "history";
import FeedPage from "./pages/FeedPage";
import { AppProvider } from "./AppContext";
import NotFoundPage from "./pages/NotFoundPage";

const history = createBrowserHistory();

const App = () => {
  return (
    <AppProvider>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <Route exact path="/feeds/:id">
            <FeedPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  );
};
export default App;
