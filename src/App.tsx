import React from "react";
import { Router, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import { createBrowserHistory } from "history";
import FeedPage from "./pages/FeedPage";
import { AppProvider } from "./AppContext";

const history = createBrowserHistory();

const App = () => {
  return (
    <AppProvider>
      <Router history={history}>
        <Route exact path="/">
          <IndexPage />
        </Route>
        <Route exact path="/:id">
          <FeedPage />
        </Route>
      </Router>
    </AppProvider>
  );
};
export default App;
