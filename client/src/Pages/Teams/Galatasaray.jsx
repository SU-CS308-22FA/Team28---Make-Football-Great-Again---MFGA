import React, { useState } from "react";
import axios from "axios";
import { ContainerDiv, PlayerTitle, StyledHr, TeamImg } from "./teamsElements";
import { PlayerCard } from "./PlayerCard";


export const Galatasaray= (props) =>{

  const [players,SetPlayers] = useState([]);

  axios.get('http://localhost:4000/teams')
  .then(res =>{
      const players = res.data;
      SetPlayers(players)
      console.log(players)
  })
  .catch((err)=>{
      console.log(err);
  })
  
  
  function createCard(player) {
      if (player.team === "Fenerbahce") {
        return (<PlayerCard

          key={player._id}
          name={player.name}
          position={player.position}
          birth={player.birth}
        />
              );
      }
          

      

    }
  
  return(
    <ContainerDiv>
    <TeamImg src="https://www.fenerbahce.org/getmedia/bf4b326b-90f0-4a6a-a332-edbfb6603de7/mobile-emblem-info.png.aspx?width=410&height=410&ext=.png"/>
    <PlayerTitle>Players</PlayerTitle>
    <StyledHr></StyledHr>
       {players.map(createCard)}
    </ContainerDiv>
  )
}

  

  
