import React, { useState } from 'react';
function Register(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name, setName] = useState("");
    async function handleRegister(){
    const response = await fetch("/api/users", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({name, email,password})});
        const data = await response.json();
        console.log(data);}
    return (
    <div>
        <h1>
            Register
        </h1>
        <input
           type="email"
           placeholder="Email"
           value = {email}
           onChange={(event) => setEmail(event.target.value)}
        />
        <input
         type="password"
         placeholder="Password"
         value = {password}
         onChange={(event)=>setPassword(event.target.value)}
         />
         <input
         type = "text"
         placeholder = "name"
         value = {name}
         onChange = {(event) => setName(event.target.value)}/>
         <button onClick = {handleRegister} >Register </button>
    </div>    );
    }
export default Register
