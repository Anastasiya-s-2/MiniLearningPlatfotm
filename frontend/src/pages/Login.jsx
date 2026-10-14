import React, { useState } from 'react';

function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    async function handleLogin(){
    const response = await fetch("/api/auth/login", {
    method: "POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({email,password})});
    const data = await response.json();
    console.log(data);
    localStorage.setItem("token", data.token);
    }
    return (
        <div>
            <h1>Login</h1>

            <input
                type="email"
                placeholder="Email"
                value = {email}
                onChange={() => setEmail(event.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value = {password}
                onChange = {() => setPassword(event.target.value)}
            />

            <button onClick = {handleLogin}>Login</button>
        </div>
    );
}

export default Login;
