
import React, { useEffect, useState } from "react";

import axios, { Axios } from "axios";




export const Edit = ()  => {
  
    const[name,setName] = useState("");
    const[pass,setPass] = useState("");
    const[username,setUsername] = useState("");
    
const [values,setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
});


const updateName = (id) => {
  axios.put("http://localhost:4000/edit",id.name);
}
  return (
    <div>
      <h1>User List</h1>
      <label>Username</label>
      <input type="text"
      onChange={(event) => {
        setUserName(event.target.value);
      }}></input>
      <button onClick={() => updateName(values._id)}> Update</button>
      
    </div>
  );
}