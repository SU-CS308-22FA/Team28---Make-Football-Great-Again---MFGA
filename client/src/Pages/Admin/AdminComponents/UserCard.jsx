import React from "react";
import axios from "axios";
import { ContainerCard, UserTitle,MailTitle,StyledButton,StyledActivateButton} from "./UserCardElements";

export const UserCard = (props)=>{
    const handleSubmit = (e) => {
        e.preventDefault();
        const banned ={
            name: props.name,
            email: props.mail,
            id: props._id

        }

        axios
        .post("http://localhost:4000/api/admin/" + props.id, banned)
        .then((response) => {
            window.alert("User successfully banned from the system")
            
          
        });
    }
    
    return(
        <ContainerCard>
            <UserTitle>{props.name}</UserTitle>
            
            <MailTitle>{props.mail}</MailTitle>
            <StyledButton onClick={handleSubmit}>Ban</StyledButton>
        </ContainerCard>
    )

}

export const BannedCard = (props)=>{
    const handleSubmit = (e) => {
        e.preventDefault();
        const activated ={
            name: props.name,
            email: props.mail,
            id: props._id

        }

        axios
        .post("http://localhost:4000/api/admin/banned/" + props.id, activated)
        .then((response) => {
            window.alert("User successfully reactivated to the system")
            
          
        });
    }
    
    return(
        <ContainerCard>
            <UserTitle>{props.name}</UserTitle>
            
            <MailTitle>{props.mail}</MailTitle>
            <StyledActivateButton onClick={handleSubmit}>Re-activate</StyledActivateButton>
        </ContainerCard>
    )

}