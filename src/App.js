import logo from './logo.svg';
import './App.css';
import User from './components/User';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id='firebase-auth-container'>
          
        </div>
      </header>
      <User  />
    </div>
  );
}

export default App;