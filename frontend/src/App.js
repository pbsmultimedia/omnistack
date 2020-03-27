// React uses Babel, so we can use imports
// on the backend we use node, so we use require
import React from 'react';
//import Login from './pages/Login'; // looks for a index file
import Routes from './routes';
import './global.scss';

function App() {
  return (
    <Routes />
  );
}

export default App;
