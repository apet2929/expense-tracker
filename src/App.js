import logo from './logo.svg';
import './App.css';
import User from './components/User';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id='firebase-auth-container'>
          <h3 id="saveStatus" style={{hidden: true}}></h3>
        </div>
      </header>
      <User  />
    </div>
  );
}

export default App;