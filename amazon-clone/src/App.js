import './App.css';
import Header from './Header';
import React,{useEffect} from 'react'
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase';
import {useStateValue} from'./StateProvide';
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"

const promise=loadStripe("pk_test_51KEzjISGoMPfHW4DbsVuv9m4ZD7h0wrsY6ZHHwd9PtGc40FEOh693TJ5rHaZX5nFYrTKlbGdmpWcr52w7dIM6AVB00D0h4gFPI");

function App() {

  const[{},dispatch]=useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser=>{
      console.log('the user is=>',authUser)
      if (authUser) {
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      } else {
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    });
    return () => {   
    }
  }, [])

  return (
    <Router>
       <div className="App">  
        <Routes>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/checkout' element={
          <> 
          <Header/>
          <Checkout/>  
          </>}/>
          <Route path='/payment' element={
            <> 
            <Header/>
            <Elements stripe={promise}>
            <Payment/>
            </Elements>
            </>}/>
         <Route path="/" element={
          <>
          <Header/>
          <Home/>
          </>}/>  
          <Route path="*" element={
            <>
            <Header/>
            <Home/>
            </>}/>     
        </Routes>
      </div>
    </Router>
  );
}

export default App;
