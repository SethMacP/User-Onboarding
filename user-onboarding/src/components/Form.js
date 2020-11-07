import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import * as Yup from 'yup'

import Users from "./Users"


export default function OnboardForm (props) {
const [ users, setUsers ] = useState([]);
const [formState, setFormState] = useState({
        name : "",
        email : "",
        password: "",
        tos: "",
        why: "",
    })
const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        tos: "",
        why: "",
    })
 
//TURN FORMSTATE TO USERSTATE
//TURN FORMSTATE TO USERSTATE
//Duplicate?
// const addNewUser = (formState) => {
//     const newUser = {
//       id: Date.now(),
//       name : formState.name,
//       email : formState.email,
//       password: formState.password,
//       tos: formState.tos,
//       why: formState.why,
//     }
//     setUsers([ ...users , newUser ])
//     console.log("addNewUser Ran: ", users)
//   }


//POST FORM & ADD USER
//POST FORM & ADD USER

    const formSubmit = e => {
        e.preventDefault();
        //console.log('formstate', formState)
        // addNewUser(formState);   
        
        
        console.log("Form : Submitted.")
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res =>{
                    setUsers([res.data,...users]);
                    console.log( "Success setUser" , users)
                })
            .catch(err => {
                console.log( "Error" , err );
                });

        setFormState({
            name : "",
            email : "",
            password: "",
            tos: false,
            why: "",
        })
        
    }

//UPDATE FORMSTATE'S OBJECT
//UPDATE FORMSTATE'S OBJECT

const handleChanges = e => {
    e.persist()
// console.log('e.target.value',e.target.value);
    validate(e)
    setFormState({...formState, [e.target.name]: e.target.value})
    }
const handleChanges2 = e => {
    validate(e)
    if (e.target.checked){
        e.target.removeAttribute('checked');
    }
    else{
        e.target.setAttribute('checked', true);
    }
    setFormState({...formState, [e.target.name]: e.target.checked})
    }

      
//VALIDATE CHANGES
//VALIDATE CHANGES

    const validate = (e) => {
        // console.log("e", e)
        Yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            console.log(valid)
            setErrorState({
                ...errorState,
                [e.target.name]: ""
            })
        })
        .catch(error => {
            //console.log(error.errors)
            setErrorState({
                ...errorState,
                [e.target.name]:error.errors[0]
            })
        })
    }


//FORM VALIDATION
//FORM VALIDATION

    const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .required("You must enter a name"),
        email: Yup
            .string()
            .email("Please enter a valid email.")
            .required('You must include an email'),
        password: Yup
            .string()
            .min(6, "Your password must be atleast 6 characters long")
            .required('You must include a password'),
        tos: Yup
            .boolean()
            .oneOf([true], "You must accept the terms of service to continue"),
        why: Yup
            .string()
            .min(40, "Please write out a thoughtful answer")
            .required("This is important, take your time.")
        })

//RETURN STATEMENT
//RETURN STATEMENT

    return(
    <div className ='flexForm'>
        <Form onSubmit ={formSubmit}>
            <FormGroup>
                <Label htmlFor="name">
                    Name
                    {/* String, Req */}
                    <Input 
                        type="text"
                        name="name"
                        placeholder="NAME"
                        id="name"
                        size="44"
                        value={formState.name}
                        onChange={handleChanges}
                        />
                    {errorState.name.length >= 1 ? <p className="error">{errorState.name}</p> : null}
                        
                    </Label>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">
                    Email
                    {/* String, Req, Email */}
                    <Input 
                        type="email"
                        name="email"
                        placeholder="EMAIL"
                        id="email"
                        size="44"
                        value={formState.email}
                        onChange={handleChanges}/>
                    {errorState.email.length >= 1 ? <p className="error">{errorState.email}</p> : null}
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    Password
                    {/* Minimum of 6 characters, required, string */}
                    <Input 
                        type="password"
                        name="password"
                        placeholder="PASSWORD"
                        id="password"
                        size="44"
                        value={formState.password}
                        onChange={handleChanges}/>
                    {errorState.password.length >= 6 ? <p className="error">{errorState.password}</p> : null}
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    <Input 
                        // required
                        type="checkbox"
                        name="tos"
                        id="tos"
                        checked={formState.tos}
                        onClick={handleChanges2}/>
                        Agree to TOS?
                        {errorState.tos === 'on' ? <p className="error">{errorState.tos}</p> : null}
                </Label>
                </FormGroup>
            <FormGroup>
                <Label>
                    What is your "Lambda Why"?
                   <input 
                        type="textfield"
                        name="why"
                        id="why"
                        value={formState.why}
                        onChange={handleChanges}
                        />
                   <FormText color="muted">Do your best to write out as much as you can. Fully understanding your why is paramount to keeping your motivation and determination levels high.</FormText>
                   
                </Label>
            </FormGroup>
            
            <Button id="submitBtn">Submit</Button>
        </Form>

        <div>
            <Users users={users}/>
        </div>

    </div>
    );

}

/* notes */

//useState to hold the object of information from the form

// Form must include the following (+more)
// [x]Name
// [x]Eamil
// [x]Password
// [x]TOS (Checkbox)
// [x]Season
// [x]Why

//Impliment form validation and error messaging for these items using yup