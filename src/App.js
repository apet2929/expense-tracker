import logo from './logo.svg';
import './App.css';
import User from './components/User';
import { getAuth } from 'firebase/auth';
import { googleSignin, googleSignout, getCurrentUser } from "./Auth"

function App() {
  let user = getCurrentUser();
  let name = user ? user.displayName : "Null Name";
  let email = user ? user.email : "Null Email"
  return (
    <div className="App">
      <header className="App-header">
        <div id='firebase-auth-container'>
          <h2>{name}</h2>
          <h2>{email}</h2>
          <button onClick={ googleSignin }>Sign In</button>
          <button onClick={ googleSignout }>Sign Out</button>
        </div>
        <div id='loader'>Loading...</div>
      </header>
      <User />
    </div>
  );
}

export default App;