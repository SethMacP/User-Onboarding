import react , {useState,useEffect} from 'react'
import axios from 'axios'
import * as yup from 'yup'
import OnboardForm from './components/Form'


import './App.css';

//I apparently forgot to fork it, so I copy and pasted my old code into here.

export default function App() {

    return (
      <>
      <div className="App">
        <OnboardForm />
          
      </div>
      </>
    );
  }


