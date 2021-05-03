// import * as BooksAPI from './BooksAPI'
import Home from "./Home";
import "./App.css";
import { Route, Switch } from "react-router";
import Search from "./Search";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route>
          not found!
        </Route>
      </Switch>
    </div>
  );
}

export default App;
