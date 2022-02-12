import React, {Fragment, Component} from 'react';
import './App.css';

class App extends Component {
  render(){
    const name = 'john 117';
    const loading = false;
    const showName = true; 
    
    return (
      <div className="App">
          {loading ? <h3>Loading....</h3> : <h1>Hello {showName && name}</h1>} 
      </div>
    );
  }
}

export default App;