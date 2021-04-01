// import React, {Component} from 'react';
// import './App.css';
// import {signIn, signOut, getMyUsername, getMyTotalToken, setMyPassword, setMyUsername} from './user_middleware';

// class App extends React.Component{
//   constructor(){
//     super();
//     this.state = {
//       like : false
//     }
//   }

//   handleClick(){
//     this.setState(
//       {
//         like : !this.state.like
//       }
//     )
//   }

//   render(){
//     return (
//       <div id='root'>
//         <button type = "button" style = {this.state.like ? {color : "red"} : {color : "black"}}
//           onClick = {()=>this.handleClick()}
//         >
//           {
//             this.state.like ? 'liked!' : 'like'
//           }
//         </button>
//         <h1>{getMyUsername(100)}</h1>
//       </div>
//     )
//   }
// }

// export default App;


import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import AnimalInfoPage from './transaction/AnimalInfo/AnimalInfoPage';
// import AddTokensPage from './transaction/AddTokens/AddTokensPage';
// import SignUpPage from './User/OrderConfirm/OrderConfirmPage';

class App extends React.Component{
  render(){
    return (
      <Router>
        <div id='root'>
          <Route path = '/AnimalInfo' component = {AnimalInfoPage}/>
          {/* <Route path = '/AddTokens' component = {AddTokensPage}/> */}
          {/* <Route path = '/OrderConfirm' component = {OrderConfirmPage}/> */}
        </div>
      </Router>
    )
  }
}

export default App;
