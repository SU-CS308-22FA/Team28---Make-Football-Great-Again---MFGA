import React from "react";
import { TeamCard } from "./TeamCard";
import axios from "axios";
import { useState } from "react";
import { ContainerDiv } from "./teamsElements";


export const Team = ()=>{


    const [teams,SetTeams] = useState([]);
    axios.get('https://mfga.herokuapp.com/profile')
    .then(res =>{
        const teams = res.data;
        SetTeams(teams)
    })
    .catch((err)=>{
        console.log(err);
    })
    function createCard(team) {
          return (<TeamCard
  
            key={team._id}
            name={team.name}
          />
                );
        
      }

    return(
        <ContainerDiv>
                {teams.map(createCard)}
        </ContainerDiv>




    );
}