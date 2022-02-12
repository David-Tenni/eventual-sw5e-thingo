import React, { Component } from 'react';

class UserItem extends Component {
    state ={
        id: 'id',
        login: 'mojo',
        avatar_url: 'https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar',
        html_url: 'https://github.com/mojombo',
    }
    
  render() {
    const {login, avatar_url, html_url} =this.state;

    return (
        <div className='card text-center'>
            <img 
            src={avatar_url} 
            alt='' 
            className='round-img' 
            style={{width: '60px'}}
            />
            <h3>{login}</h3>
            <div>
                <a href={html_url} className='a.btn.btn-dark.btn-sm.my-1' > 
                more
                </a>
            </div>
        </div>
    );
  }
}

export default UserItem;