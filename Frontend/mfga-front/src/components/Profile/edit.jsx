
import React, { useEffect, useState } from "react";

import axios, { Axios } from "axios";




export const Edit = ()  => {
  
const [values,setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
});



const [newusername, setUserName] =  useState();

const updateName = (id) => {
  axios.put("http://localhost:3000/edit",{id:id , newusername:newusername});
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