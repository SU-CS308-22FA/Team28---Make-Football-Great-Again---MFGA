import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { ContainerDiv, NameTitle, RedCard, RedCardTitle, RefereeCard, YellowCard, YellowCardTitle,YellowRedCardTitle,YellowRedCard,MatchCountTitle, MatchCount, PenaltyTitle, Penalty, RefereeImg, Rating} from "./refereePageElements";
import { RatingCard } from "./ratingCard";
import { UserDisp,DisplayAuth } from "../../components/PageDirect/NavbarDisplay";


export const RefereePage = ()=>{
  var email = ""
  if(localStorage.getItem("currentUser")!== null){
    const user = JSON.parse(localStorage.getItem("currentUser"));
     email = user.email;

  }
 
    const {name} = useParams();
    const [referees,SetReferees] = useState([]);
    const[yellowCard,SetYellow] = useState([]);
    const[redCard,SetRed] = useState([]);
    const[yellowRedCard,SetYellowRed] = useState([]);
    const[matchCount,SetMatchCount] = useState([]);
    const[penalty,SetPenalty] = useState([]);
    const[myName,SetName] = useState([]);
    const[Img,SetImg] = useState([]);
    const[point,SetPoint]=useState([]);
    const[ratedPeople,SetPeople]=useState([]);


    useEffect(() => {
        axios
        .get("http://localhost:4000/referees")
        .then(res => {
          const referees = res.data;
          SetReferees(referees);
          referees.forEach(element => {
            var cleanName = element.name;
            cleanName = cleanName.replace(" ", "")
            cleanName = cleanName.replace(" ", "")
            cleanName = cleanName.replace(" ", "")
            if(cleanName === name){
              SetYellow(element.yellowCard)
              SetYellowRed(element.yellowRedCard)
              SetMatchCount(element.matchCount)
              SetPenalty(element.penalty)
              SetRed(element.redCard)
              SetName(element.name)
              SetImg(element.image)
              SetPoint(element.point)
              SetPeople(element.ratedPeople)
                
              }
              
          });
         
        })
        .catch((err) => {
          console.log(err);
        });
      }, [])

      function DetermineRating(point,ratedPeople){
        if(point === 0){
          return 0;
        }
        else{
          return (Math.round((point/ratedPeople)* 100) / 100).toFixed(1)

        }
      }

      return(
        <ContainerDiv>
          <RefereeCard>
          <DisplayAuth>
              <UserDisp>
                <RatingCard key = {myName} refName = {myName} userName={email}></RatingCard>
                </UserDisp>
          </DisplayAuth>
          <Rating>Rating: {DetermineRating(point,ratedPeople)}⭐</Rating>
          <RefereeImg src={Img}></RefereeImg>
          <NameTitle>{myName}</NameTitle>
          <RedCardTitle>Red Card</RedCardTitle>
          <RedCard>{redCard}</RedCard>
          <YellowCardTitle>Yellow Card</YellowCardTitle>
          <YellowCard>{yellowCard}</YellowCard>
          <YellowRedCardTitle>Yellow-Red Card</YellowRedCardTitle>
          <YellowRedCard>{yellowRedCard}</YellowRedCard>
          <MatchCountTitle>MatchCount</MatchCountTitle>
          <MatchCount>{matchCount}</MatchCount>
          <PenaltyTitle>Penalty</PenaltyTitle>
          <Penalty>{penalty}</Penalty>
          </RefereeCard>
          
        </ContainerDiv>
      )

}