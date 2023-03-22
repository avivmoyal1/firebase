import './App.css';
import { useState } from 'react';
import FirebaseAuthService from './FirebaseAuthService';
import LoginForm from './components/LoginForm';

function App() {
  const [user, setUser ] = useState(null);

  FirebaseAuthService.subscribeToAuthChangers(setUser);
  
  return (
    <div className="App">
     <div className='title-row'>
      <h1 className='title'>Firebase Recipes</h1>
      <LoginForm existingUser={user}></LoginForm>

     </div>
    </div>
  );
}

export default App;
