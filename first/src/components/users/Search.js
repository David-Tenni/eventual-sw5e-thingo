import React, { Component } from 'react'
import PropTypes from 'prop-types';
export class Search extends Component {
  state = {
      text: ''
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearSearch: PropTypes.bool.isRequired,

  };
  
  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({text: ''});
  };
 
    render() {
    return (
      <div>
          <form onSubmit={this.onSubmit} className='from' >
            <input 
            name='text' 
            placeholder='search users..' 
            type='text' 
            value={this.state.text} 
            onChange={this.onChange}
            /> 
            
            <input 
            type='submit' 
            value='search' 
            className='btn btn-dark btn-block'/> 
          </form>
          <button className='btn btn-light btn-block' onClick={this.props.clearSearch}>Clear</button>
      </div>
    )
  }
}

export default Search