import React, {useState} from 'react'

export default function Users (props) {
console.log('props.users',props.users)

    
    return(
        <>
        
        <div className="users">

        {props.users.map( (user) => (
                <div className="user" key={user.id}>
                    
                    <h4>Name: {user.name}</h4>
                    <p>Email: {user.email}</p>
                    <p>TOS: {(user.tos ? "Yes" : "No" )}</p>
                    <p>Why:{user.why}</p>
                    <p>ID: {user.id}</p>
                    
                </div>
            ))}

        </div>
            
        </>
    )
}



