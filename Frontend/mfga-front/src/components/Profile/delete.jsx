import React,{useState} from "react";
import axios from "axios";

const Delete=()=>{
    const[values,setValues] = useState({
        username:"",
    });
};

const handleChange=(e)=>{
    const{name,value}=e.target;
    setValues({
        ...values,
        [name]:value,
    });
};

const handleSubmit = (e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    const deleted={
        ...values,
        [name]:value,
    };




    axios.delete("http://localhost:4000/delete")
    .then((res)=>{
        if(res.status==200){
            console.log("Deleted");
        }
        else{
            console.log("Error happened, cannot delete!");
        }
    })
    .catch((err)=>{
        console.log(err);
    });

    setValues({
        username:"",
    });
}