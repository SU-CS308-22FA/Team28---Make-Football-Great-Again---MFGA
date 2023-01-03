import React,{useState} from "react";
import axios from "axios";
import { ContainerCard, StyledButton, StyledForm, StyledInputName, StyledInputRoute, StyledNameLabel, StyledRouteLabel, Title } from "./searchDataAddElements";

export const SearchDataAdd =()=>{
    const[name,setName] = useState(null)
    const[route,setRoute] = useState(null)
    const handleSubmit = () => {
        if(name !== null && name !== "" && route !== null && route !== ""){
            const needs = {
                name: name,
                route:route,
            }

          axios
          .post("https://mfga.herokuapp.com/searchData", needs)
          .then((res) => {
            if(res.status===200){
                window.alert(res.data.message)
                window.location.reload()
                console.log("Data added!");
                
            }
            else{
                console.log("Error happened, cannot sent data!");
            }
            
          });
          
        }
        else{
            window.alert("Name or route cannot be empty!")
        }
      };
    

    return(
        <ContainerCard>
        <Title>Search Data Add</Title>
            <StyledForm>
                <StyledNameLabel>Name</StyledNameLabel>
                <StyledInputName
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder = "Example: Name..."/>
                <StyledRouteLabel>Route</StyledRouteLabel>
                <StyledInputRoute 
                value={route}
                onChange={(event) => setRoute(event.target.value)}
                placeholder = "Example: /route..."/>
                <StyledButton onClick={handleSubmit}>Add</StyledButton>
            </StyledForm>

        </ContainerCard>
    )
}