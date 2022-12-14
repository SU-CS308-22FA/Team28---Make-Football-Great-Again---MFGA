import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ContainerDiv, PlayerTitle, StyledHr, TeamCard, TeamImg,TeamNameTitle,StatsTitle,StandingCard,standingsTitle} from "./teamsElements";
import { PlayerCard } from "./PlayerCard";


var stop = true;
export const TeamPage= () =>{


  const [players,SetPlayers] = useState([]);
  const {team} = useParams();

  axios.get('https://mfga.herokuapp.com/teams/'+team)
  .then(res =>{
      const players = res.data;
      SetPlayers(players)
  })
  .catch((err)=>{
      console.log(err);
  })

  const [teamsInfo,SetTeamInfo] = useState([]);
  const [teamsName,SetName] = useState([]);
  const [teamsImg,SetImg] = useState([]);
  useEffect(() => {
  axios.get('https://mfga.herokuapp.com/profile')
  .then(res =>{
      const teamsInfo = res.data;
      SetTeamInfo(teamsInfo);
      teamsInfo.forEach(element => {
        var cleanName = element.name;
        cleanName = cleanName.replace(" ", "")
        cleanName = cleanName.replace(" ", "")
        cleanName = cleanName.replace(" ", "")
        if(cleanName === team){
          SetName(element.name);
          SetImg(element.url);
        }
        
      });
  })
  .catch((err)=>{
      console.log(err);
  })
}, [])

  const [teamStat, setTeamStat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://mfga.herokuapp.com/stat/getStat");

      setTeamStat(result.data);
    };

    fetchData();
  }, []);


  
  
   
  function createCard(player) {
      var playerTeam = player.team;
      playerTeam = playerTeam.replace(" ", "")
      playerTeam = playerTeam.replace(" ", "")
      if (playerTeam === team) {
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
    <TeamCard>
    <TeamImg src={teamsImg}/>
    <TeamNameTitle>{teamsName}</TeamNameTitle>
    <PlayerTitle>Players</PlayerTitle>
    <StatsTitle>Stats</StatsTitle>
    {teamStat.filter(CurrentTeam => CurrentTeam.team === team.trim()).map(filteredTeam => (
          <StandingCard>
          <standingsTitle>Rank: {filteredTeam.rank}</standingsTitle>
          <standingsTitle>Win: {filteredTeam.win}</standingsTitle>
          <standingsTitle>Lose: {filteredTeam.lose}</standingsTitle>
          <standingsTitle>Draw: {filteredTeam.draw}</standingsTitle>
          <standingsTitle>Point: {filteredTeam.point}</standingsTitle>
        </StandingCard>
  ))}
    
    <StyledHr></StyledHr>
       {players.map(createCard)}
    </TeamCard>
    </ContainerDiv>
  )
}

  

  
