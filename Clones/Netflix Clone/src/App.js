import React, {useEffect} from 'react';
import './App.css';
import HomeScreen from "./pages/HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from './pages/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector} from 'react-redux';
import { login, logout, selectUser } from "./features/counter/userSlice"
import ProfileScreen from './pages/ProfileScreen';

function App() {

  const user = useSelector(selectUser);
  
  const dispatch = useDispatch();

  // for checking if the user previously logged in or not if then automatically login 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
          // Logged in
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        })
        );

      } else {
        // Logged out
        dispatch(logout());
        }
    })
    return () => {
      unsubscribe();
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
            <Switch>
              <Route path="/profile">
                <ProfileScreen />
            </Route>
            <Route exact path="/">
              <HomeScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
