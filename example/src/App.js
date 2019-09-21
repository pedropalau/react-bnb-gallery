import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import pages from './pages';

import {
  Container,
  Header,
} from './components';

class App extends Component {
  renderRoute({
    id,
    disabled,
    getComponent,
  }, isDefault) {
    if (!disabled) {
      if (isDefault) {
        return (
          <Route
            key={`default-${id}`}
            path="/"
            exact
            component={getComponent}
          />
        );
      }
      else {
        return (
          <Route
            key={id}
            path={`/${id}`}
            exact
            component={getComponent}
          />
        );
      }
    }
  }

  renderRoutes() {
    const routes = [];

    pages.forEach((route) => {
      const { isDefault } = route;
      if (isDefault) {
        routes.push(this.renderRoute(route, true));
      }
      routes.push(this.renderRoute(route));
    });

    return routes;
  }

  render() {
    return (
      <Router>
        <Header />
        <Container role="main">
          <Fragment>
            {this.renderRoutes()}
          </Fragment>
        </Container>
      </Router>
    );
  }
}

export default App;
