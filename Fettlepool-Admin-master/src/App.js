import React from 'react';
import './App.css';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
function App() {
  
  // if (localStorage.getItem('admin') == "" || localStorage.getItem('admin') == null)
  // {
    return (
      <div>
        <Login />
      </div>
  );
// }
//   else{
//   return (
//       <div>
//       <Dashboard />
//       </div>
//   );}
}

export default App;
