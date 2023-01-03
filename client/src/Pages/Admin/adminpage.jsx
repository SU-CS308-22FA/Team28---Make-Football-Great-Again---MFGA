import React, { useState } from "react";
import { BannedDiv, BannedTitle, ContainerDiv, UserTitle,BanDiv, GeneralTitle } from "./adminpageElements";
import {RegisterBoard} from "./AdminComponents/registerBoardMember";
import { UserCard,BannedCard } from "./AdminComponents/UserCard";
import axios from "axios";
import { Footer } from "../../components/Footer/Footer";
import { SearchDataAdd } from "./AdminComponents/searchDataAdd";

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
                <GeneralTitle>Admin Panel</GeneralTitle>
                  <RegisterBoard /> 
                  <SearchDataAdd/>
                  <UserTitle>Users List</UserTitle>
                  <BanDiv>
                  {users.map(createCard)}
                  </BanDiv>
                  
                  <BannedTitle>Banned List</BannedTitle>
                  <BannedDiv>
                  {users.map(createBannedCard)}
                  </BannedDiv>
                  
        </ContainerDiv>
   
    )

};