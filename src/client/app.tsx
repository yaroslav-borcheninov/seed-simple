import React from "react"
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom"

import NotFound from "./components/not-found"
import Items from "./components/items"
import Item from "./components/item"
import { GlobalStyle, Container } from "./styled"

const App = (
  <React.Fragment>
    <Container>
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="items" exact={true} />
          <Route path="/items" exact={true} component={Items} />
          <Route path="/items/:id" exact={true} component={Item} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Container>
    <GlobalStyle />
  </React.Fragment>
)

export default App
