import React, { useEffect } from "react";
import { TeamCard } from "./TeamCard";
import axios from "axios";
import { useState } from "react";
import { ContainerDiv } from "./teamsElements";
import { Footer } from "../../components/Footer/Footer";


export const Team = ()=>{


    const [teams,SetTeams] = useState([]);

    useEffect(() => {
        axios.get('https://mfga.herokuapp.com/profile')
        .then(res =>{
            const teams = res.data;
            SetTeams(teams)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    function createCard(team) {
          return (<TeamCard
  
            key={team._id}
            name={team.name}
            image={team.url}
          />
                );
        
      }

    return(
        <ContainerDiv>
                {teams.map(createCard)}
                
        </ContainerDiv>





    );
}