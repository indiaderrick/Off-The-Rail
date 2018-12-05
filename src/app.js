import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import ItemIndex from './components/items/ItemIndex';
import ItemShow from './components/items/ItemShow';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import 'bulma';
import './scss/main.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <main>
            <Switch>
              <Route exact path='/items' component={ItemIndex}/>
              <Route path='/items/:id' component={ItemShow}/>
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
