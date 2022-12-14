import React, { useState } from "react";
import { ContainerDiv, UserTitle } from "./adminpageElements";
import {RegisterBoard} from "./AdminComponents/registerBoardMember";
import { UserCard,BannedCard } from "./AdminComponents/UserCard";
import axios from "axios";

export const Admin = () =>{

    const [users,SetUsers] = useState([]);
    axios.get('https://mfga.herokuapp.com/api/admin')
    .then(res =>{
        const users = res.data;
        SetUsers(users)
    })
    .catch((err)=>{
        console.log(err);
    })
    
    
    function createCard(user) {
        if(user.status === 1){
            return (
                <UserCard

                  key={user.email}
                  name={user.name}
                  id={user._id}
                  mail={user.email}
                />
            );

        }
  
      }
      
      function createBannedCard(user) {
          if(user.status === 0){
              return (
                  <BannedCard
                  
                    name={user.name}
                    key={user.email}
                    id={user._id}
                    mail={user.email}
                  />
              );
  
          }
    
        }
    return(
        <ContainerDiv>
                  <RegisterBoard /> 
                  <UserTitle>Users List</UserTitle>
                  
                  {users.map(createCard)}
                  <UserTitle>Banned List</UserTitle>
                  {users.map(createBannedCard)}
    
            
        </ContainerDiv>
   
    )

};