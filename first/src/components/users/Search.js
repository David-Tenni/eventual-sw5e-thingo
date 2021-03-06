import React, { Component } from 'react'
import PropTypes from 'prop-types';
export class Search extends Component {
  state = {
      text: '',
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
  };
  
  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
    this.props.setAlert(null, null); 
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === ''){
      this.props.setAlert('Please enter a value before submiting', 'light');
    } else {
        this.props.searchUsers(this.state.text);
        this.setState({text: ''});
    };
  };
 
    render() {
        const{showClear, clearSearch} =this.props;
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
          {showClear && <button className='btn btn-light btn-block' onClick={clearSearch}>Clear</button> }
      </div>
    )
  }
}

export default Search