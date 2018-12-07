import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import ItemIndex from './components/items/ItemIndex';
import ItemShow from './components/items/ItemShow';
import ItemNew from './components/items/New';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import OwnProfile from './components/users/OwnProfile';
import Basket from './components/Basket';
import Messages from './components/messages/Messages';
import Purchases from './components/PurchaseHistory';
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
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/basket' component={Basket}/>
              <Route exact path='/purchases' component={Purchases}/>
              <Route path='/items/new' component={ItemNew}/>
              <Route exact path='/messages' component={Messages}/>
              <Route exact path='/messages/:id' component={Messages}/>
              <Route path='/users/:id' component={OwnProfile}/>
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
