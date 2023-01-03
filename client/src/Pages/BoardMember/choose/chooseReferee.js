import React, { useEffect, useState } from "react";
import axios from "axios";

import { ContainerDiv,FilterTitle, Title ,StyledBackButton, RefereeDiv,ImportanceTitle, ImportanceNumberTitle } from "./chooseRefereeElements";
import { Footer } from "../../../components/Footer/Footer";
import { RefereeCard } from "./chooseCard";
import { useNavigate,useParams } from "react-router-dom";
export const ChooseReferee = (props) => {
  const {home,away} = useParams();
  var MatchImportance = 0;
  var MatchImportanceStr = "";


  const navigate = useNavigate();
  const [referees, SetReferees] = useState([]);
  const [teamStat, setTeamStat] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:4000/stat/getStat");
      setTeamStat(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    axios
        .get("http://localhost:4000/referees")
        .then( (res) => {
          const referees = res.data;
          SetReferees(referees);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  if (referees === 0) {
    return <h1>Loading...</h1>;
  }
  const handleBack = ()=>{
    navigate("/board")
}

  function createCard(referee) {
    return (
      <RefereeCard
        key={referee._id}
        name={referee.name}
        image={referee.image}
        matchCount ={referee.matchCount}
        rating ={CalculateRating(referee)}
        point = {CalculatePoint(referee)}
        
      />
    );
  }
  // Calculating Average Rating of referee
  function CalculateRating(referee){

    if (referee.point === 0 ) {
      return 0;
    }
    else{
      return (Math.round((referee.point/referee.ratedPeople)* 100) / 100).toFixed(1);
    }

  }
  // Calculating Average Yellow Card statistics of referee

  function CalculateYellow(referee){
    const myAverage = (Math.round((referee.yellowCard/referee.matchCount)* 100) / 100).toFixed(2);

    if (myAverage <= 4.5) {
      return 5;
    }
    else if(myAverage > 4.5 && myAverage <= 5){
      return 3;
    }
    else {
      return 1;
    }

  }
  // Calculating Average Red Card statistics of referee

  function CalculateRed(referee){
    const myAverage = (Math.round((referee.redCard/referee.matchCount)* 100) / 100).toFixed(2);

    if (myAverage <= 0.2) {
      return 5;
    }
    else if(myAverage > 0.2 && myAverage <= 0.4){
      return 3;
    }
    else {
      return 1;
    }

  }
  // Calculating Average YellowRed Card statistics of referee

  function CalculateYellowRed(referee){
    const myAverage = (Math.round((referee.yellowRedCard/referee.matchCount)* 100) / 100).toFixed(2);

    if (myAverage <= 0.15) {
      return 5;
    }
    else if(myAverage > 0.15 && myAverage <= 0.3){
      return 3;
    }
    else {
      return 1;
    }

  }
  // Calculating Average Penalty statistics of referee

  function CalculatePenalty(referee){
    const myAverage = (Math.round((referee.penalty/referee.matchCount)* 100) / 100).toFixed(2);

    if (myAverage <= 0.4) {
      return 5;
    }
    else if(myAverage > 0.4 && myAverage <= 0.55){
      return 3;
    }
    else {
      return 1;
    }

  }
  // Calculating the match importance by teams rank
  function CalculateRank(home, away){
    var HomeAwayRank = 0
    var pointArray = [10,10,10,9,9,8,8,5,5,3,3,3,2,2,2,1,1,1,1]
    
    teamStat.forEach(stat => {
      if(stat.team === home)
      {
        HomeAwayRank += pointArray[stat.rank -1]

      }
      if(stat.team === away){
        HomeAwayRank += pointArray[stat.rank -1]

      }
    });
    if (HomeAwayRank <= 20 && HomeAwayRank >= 15) {
      
      return 75;
      
    }
    else if (HomeAwayRank <= 14 && HomeAwayRank >= 10) {
   

      return 60;
    }
    else if (HomeAwayRank <= 9 && HomeAwayRank >= 5) {
   
      return 50;
    }
    else{
     
      return 0;
    }
  }
  //Calculating total Algorithm point for filtering the referees
  function CalculatePoint(referee){
    MatchImportance = CalculateRank(home,away)
    const rating = ((CalculateRating(referee) * 20)* 80) /100;
    const redCard = CalculateRed(referee)
    const yellowCard = CalculateYellow(referee)
    const yellowRedCard = CalculateYellowRed(referee)
    const penalty = CalculatePenalty(referee)
    const totalPoint = rating + redCard + yellowCard + yellowRedCard + penalty
    return totalPoint;
  }

  return (
    
    <ContainerDiv>
    <StyledBackButton onClick={handleBack}>{"<"}Back</StyledBackButton>

    
    
    <RefereeDiv>
    <Title>Suitable Referees For This Match</Title>
    {referees.filter((referee)=> {
      if(CalculateRank(home,away) === 75){
        MatchImportance = 75;
        MatchImportanceStr = "Very High Importance";

        return (CalculateRank(home,away) <= CalculatePoint(referee))
      }
      else if(CalculateRank(home,away) === 60){
        
        if(CalculatePoint(referee) >= 60 && 75 > CalculatePoint(referee)){
        MatchImportance = 60;
        MatchImportanceStr = "High Importance";
        return (CalculatePoint(referee))
        }
      }
      else if(CalculateRank(home,away) === 50){
        if(CalculatePoint(referee) >= 50 && 60 > CalculatePoint(referee)){
        MatchImportance = 50;
        MatchImportanceStr = "Medium Importance";
        return (CalculatePoint(referee))
        }
      }
      else{
        if(CalculatePoint(referee) >= 0 && 50 > CalculatePoint(referee)){

        
        MatchImportance = 0;
        MatchImportanceStr = "Low Importance";
        return (CalculatePoint(referee))
        }
      }
      }).map(createCard)} 

      </RefereeDiv>
      <ImportanceTitle>Match Importance: { MatchImportanceStr}</ImportanceTitle>
      <ImportanceNumberTitle>Importance Number: {MatchImportance} </ImportanceNumberTitle>
      <br/>
       
      
    
    </ContainerDiv>
  );
};
