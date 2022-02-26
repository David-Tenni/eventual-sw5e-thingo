import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends Component {
state ={
  users: [],
  loading: false,
  alert: [],
}

searchUsers = async text => {
this.setState({loading: true});

  const res = await axios.get(
    `https://api.github.com/search/users?q=${text}`,
    {
      headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    }
  );

  this.setState({users: res.data.items, loading: false});
};
//remove all the users by removing state
clearSearch = () => {this.setState({users: [], loading: false})};
setAlert = (msg, type) => {
  this.setState({ alert: { msg, type}});
  this.setState(!type ? { alert: null } : { alert: { msg, type } });
};
  render() {
    const {users, loading} = this.state;
    return (
      <Router>
          
        <div className='App'>
            <Navbar/>
            <div className='container'>
              <Alert Alert alert={this.state.alert}></Alert>

              <Switch>
                <Route  exact path='/' render={props => (

                <Fragment>
                  <Search searchUsers={this.searchUsers} setAlert={this.setAlert} clearSearch={this.clearSearch} showClear={users.length > 0 ? true : false}/>
                  <Users loading={loading} users={users} />
                </Fragment>
                
              )}/> 
              </Switch>
            </div>
        </div>

      </Router>
    );
  }
}

export default App