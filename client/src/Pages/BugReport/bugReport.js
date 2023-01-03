import React,{useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContainerCard, ContainerDiv, StyledForm, Title,DropDownContainer2,DropDownHeader2,DropDownList2,DropDownListContainer2,ListItem2, StyledFilterLabel, StyledInputComment, StyledButton } from "./bugReportElements";
import { Footer } from "../../components/Footer/Footer";


export const BugReport = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [comment,setComment] = useState();
    const navigate = useNavigate();
    
    const options = ["Team Pages","Referee Pages","Community Page", "Profile Page","Login-SignUp","Other"];
    const toggling = () => setIsOpen(!isOpen);
    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
        console.log(selectedOption);
      };

      const handleSubmit = () => {
        console.log(comment);
        if(comment != null && comment != "" && selectedOption != null){
            const needs = {
                comment: comment,
                type:selectedOption,
            }

          axios
          .post("https://mfga.herokuapp.com/bugReport", needs)
          .then((res) => {
            if(res.status===200){
                window.alert(res.data.message)
                console.log("Reported!");
                navigate("/")
            }
            else{
                console.log("Error happened, cannot sent bug!");
            }
            
          });
          
        }
        else{
            window.alert("Comment or type cannot be empty!")
        }
      };
    return (
        <ContainerDiv>
        <ContainerCard>
        <Title>Bug Report</Title>
        <StyledForm>
        <StyledFilterLabel>Select The Bug Type</StyledFilterLabel>
        <DropDownContainer2>
        <DropDownHeader2 
        name= "type"
        onClick={toggling}>
          {selectedOption||"Select Type"}
        </DropDownHeader2>
        {isOpen && (
          <DropDownListContainer2>
            <DropDownList2>
              {options.map(option => (
                <ListItem2 name = {option} onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </ListItem2>
              ))}
            </DropDownList2>
          </DropDownListContainer2>
        )}
      </DropDownContainer2>
      <StyledInputComment
      value={comment}
      name = "comment"
      onChange={(event) => setComment(event.target.value)}
      placeholder="Please explain the bug that you found, maximum 200 characters" maxLength= {200}>
        
      </StyledInputComment>
      <StyledButton onClick={handleSubmit}
      name = "report">Report</StyledButton>
        </StyledForm>

        </ContainerCard>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
        
        </ContainerDiv>

    )

}