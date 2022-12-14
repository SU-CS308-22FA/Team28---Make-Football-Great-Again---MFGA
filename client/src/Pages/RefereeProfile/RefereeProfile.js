import {React,useState,useEffect} from "react";
import { NameTitle,Rating,RefereeCard, ContainerDiv,RedCard,RedCardTitle,RefereeImg,YellowCard,YellowCardTitle,YellowRedCardTitle,YellowRedCard,MatchCount,MatchCountTitle,Penalty,PenaltyTitle, EmailTitle, MatchTitle } from "./RefereeProfileElements";
import { MatchCard } from "./MatchCard";
import axios from "axios";


export const RefereeProfile = ()=>{
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const email = user.email;
    const name = user.name;
    const username = user.username;
    const password = user.password;
    const role = user.role;
    const status = user.status;
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
            if(user.name === element.name){
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
      const [matches,SetMatches] = useState([]);



      useEffect(() => {
        axios
            .get("http://localhost:4000/board/nextMatches")
            .then( (res) => {
            
              const matches = res.data;
              SetMatches(matches);
            })
            .catch((err) => {
              console.log(err);
            });
      }, []);
    
      if (matches === 0) {
        return <h1>Loading...</h1>;
      }
    
      function createCard(matches) {
        return (
          <MatchCard
            key={matches._id}
            home={matches.home}
            away={matches.away}
            date={matches.date}
          />
        );
      }
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
    <Rating>My rating: {DetermineRating(point,ratedPeople)}⭐</Rating>
    <RefereeImg src={Img}></RefereeImg>
    <NameTitle>{myName}</NameTitle>
    <EmailTitle>{user.email}</EmailTitle>
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
    <MatchTitle>Assigned Matches</MatchTitle>
    {matches.filter((match)=> match.referee === user.name).map(createCard)}
    
    </RefereeCard>
    
  </ContainerDiv>
  
)

}