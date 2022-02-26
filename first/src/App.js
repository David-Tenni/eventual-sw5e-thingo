import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends Component {
state ={
  users: [],
  user: {},
  repos: [],
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
//get user profile
getUser = async (username) => {
  this.setState({loading: true});

  const res = await axios.get(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
  this.setState({user: res.data, loading: false});

};
//get repos profile
getUserRepos = async (username) => {
  this.setState({loading: true});

  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
    {
      headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
  this.setState({repos: res.data, loading: false});

};
//remove all the users by removing state
clearSearch = () => {this.setState({users: [], loading: false})};
setAlert = (msg, type) => {
  this.setState({ alert: { msg, type}});
  this.setState(!type ? { alert: null } : { alert: { msg, type } });
};
  render() {
    const {users, getUserRepos, repos, user, loading} = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Routes>
              <Route
                path='/'
                element={
                  <Fragment>
                    <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0} setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                }
              />
              <Route path='/about' element={<About/>} />
              <Route
                path={`/user/:login`}
                element={
                  <User getUser={this.getUser} getUserRepos={getUserRepos} user={user} loading={loading} repos={repos}/>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App