import React, { useState } from "react";
import axios from "axios";
import { ContainerCard,FiveInput,ContainerDiv, TwoInput, ThreeInput, FourInput, OneInput, One, Two, Three, Four,Five, Title, RateButton } from "./ratingCardElements";
export const RatingCard = (props)=>{

    const[point,SetPoint]=useState([]);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const handleSubmit = ()=>{
        const needs = {
            point: point,
            refName:props.refName,
            userName:props.userName,
            email: user.email
        }
        console.log(point);
        console.log(user.email)
        if(point >0){
      axios
      .post("http://localhost:4000/referees", needs)
      .then((res) => {
        if(res.status===200){
            window.alert(res.data.message)
            console.log("rated!");
        }
        else{
            console.log("Error happened, cannot rate!");
        }
        
      });
      
        }
    }


    return(
        <ContainerCard>
        <ContainerDiv>
        <Title>Give a point to the referee</Title>
            <OneInput type="radio" name="point" value={1} onChange={e=>SetPoint(e.target.value)}/> 
            <One>1</One>
            <TwoInput type="radio" name="point" value={2} onChange={e=>SetPoint(e.target.value)}/>
            <Two>2</Two>
            <ThreeInput type="radio" name="point" value={3} onChange={e=>SetPoint(e.target.value)}/>
            <Three>3</Three>
            <FourInput type="radio" name="point" value={4} onChange={e=>SetPoint(e.target.value)}/>
            <Four>4</Four>
            <FiveInput type="radio" name="point" value={5} onChange={e=>SetPoint(e.target.value)}/>
            <Five>5</Five>
            </ContainerDiv>
            <RateButton onClick={handleSubmit}>Rate</RateButton>   
        </ContainerCard>
    )
}