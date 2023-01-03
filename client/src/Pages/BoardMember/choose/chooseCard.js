import React from "react";
import { ContainerCard,GoButton,MatchCount,NameTitle, Point, Rating, RefereeImg } from "./chooseCardElements";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";

export const RefereeCard = (props)=>{
    const navigate = useNavigate();
    const params = useParams();

    
    

    
    const handleSubmit = ()=>{
        var navigateHomeName = params.home;
        navigateHomeName = navigateHomeName.replace("%20", " ")
        navigateHomeName = navigateHomeName.replace("%20", " ")
        var navigateAwayName = params.away;
        navigateAwayName = navigateAwayName.replace("%20", " ")
        navigateAwayName = navigateAwayName.replace("%20", " ")
        const needs = {
            home: navigateHomeName,
            away:navigateAwayName,
            referee:props.name
        }
        console.log(navigateHomeName + " "+ navigateAwayName + " "+ props.name)
        
        if(navigateAwayName.length >0){
      axios
      .post("https://mfga.herokuapp.com/board/nextMatches", needs)
      .then((res) => {
        if(res.status===200){
            window.alert(res.data.message)
            console.log("assigned");
            navigate("/board");
        }
        else{
            console.log("Error happened, cannot assign!");
        }
        
      });
      
        }
        
        
    }


    
    return(
        <ContainerCard>
            <NameTitle>{props.name}</NameTitle>
            <MatchCount>MatchCount: {props.matchCount}</MatchCount>
            <Point>Point: {props.point}</Point>
            <Rating>Rating: {props.rating}</Rating>
            <GoButton onClick ={handleSubmit}>Assign</GoButton>
        </ContainerCard>
    )

}