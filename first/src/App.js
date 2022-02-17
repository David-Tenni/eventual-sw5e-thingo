import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

class App extends Component {
state ={
  users: [],
  loading: false,
}

//testing if getting users from api works
// async componentDidMount() {
//   this.setState({loading: true});
//   const res = await axios.get(`https://api.github.com/users?
//   client_id=${process.env.REACT_APP_ALUMNI_SEARCH_CLIENT_ID}&
//   client_secret=${process.env.REACT_APP_ALUMNI_SEARCH_SECRET}`);

//   this.setState({users: res.data, loading: false});
// }

//search using this term
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
clearSearch = () => {this.setState({users: [], loading: false})
};
  render() {
    return (
        <div className='App'>
            <Navbar/>
            <div className='container'>
              <Search searchUsers={this.searchUsers} clearSearch={this.clearSearch}/>
             <Users loading={this.state.loading} users={this.state.users} />
            </div>
        </div>
    );
  }
}

export default App