import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Header from './components/Header';
import NewPoll from './components/NewPoll';
import Poll from './components/Poll';
import PollsSummary from './components/PollsSummary';

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="nav-btn-container">
          <Switch>
            <Route exact path="/">
              <Link to="/polls/new" className="btn nav-btn">
                Create your own Poll
              </Link>
            </Route>
            <Route>
              <Link to="/" className="btn nav-btn">
                Back to Home
              </Link>
            </Route>
          </Switch>
        </div>
        <main className="content">
          <Switch>
            <Route exact path="/" component={PollsSummary} />
            <Route exact path="/polls/new" component={NewPoll} />
            <Route path="/polls/:pollId" component={Poll} />
          </Switch>
        </main>
      </Fragment>
    </Router>
  );
}

export default App;
