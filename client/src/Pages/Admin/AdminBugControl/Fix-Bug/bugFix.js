import React,{useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { ContainerCard, ContainerDiv, StyledForm, Title,StyledInputType, StyledTypeLabel, StyledInputComment, StyledButton, StyledCommentLabel } from "./bugFixElements";


export const BugFix = ()=>{
    const {id} = useParams();
    const [type, setType] = useState();
    const [comment,setComment] = useState();
    const navigate = useNavigate();


      const handleSubmit = () => {
        console.log(comment);
        if(comment !== null && comment !== "" && type !== null && type !== ""){
            const needs = {
                id: id,
                comment: comment,
                type:type,
            }
            //Get bugs from database and check if isDone true;

          axios
          .post("https://mfga.herokuapp.com/bugFix/:id", needs)
          .then((res) => {
            if(res.status===200){
                window.alert(res.data.message)
                console.log("Fixed!");
                navigate("/")
            }
            else{
                console.log("Error happened, cannot sent fix!");
            }
            
          });
          
        }
        else{
            window.alert("Explanation or Title cannot be empty!")
        }


      };

    return (
        <ContainerDiv>
        <ContainerCard>
        <Title>Fixed Bug</Title>
        <StyledForm>
        <StyledTypeLabel>Title</StyledTypeLabel>
        <StyledInputType
      value={type}
      onChange={(event) => setType(event.target.value)}
      placeholder="Please enter the title of the bug that you fixed">
        
      </StyledInputType>
        <StyledCommentLabel>Explanation</StyledCommentLabel>
      <StyledInputComment
      value={comment}
      onChange={(event) => setComment(event.target.value)}
      placeholder="Please explain the bug that you fixed, maximum 500 characters" maxLength= {500}>
        
      </StyledInputComment>
      <StyledButton onClick={handleSubmit}>Fix</StyledButton>
        </StyledForm>

        </ContainerCard>
        </ContainerDiv>

    )

}