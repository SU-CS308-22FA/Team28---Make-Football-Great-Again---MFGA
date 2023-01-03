import React, {useState,useEffect} from "react";
import axios from "axios";
import { ContainerDiv,DropDownContainer2,DropDownHeader2,DropDownList2,DropDownListContainer2,ListItem2,FilterTitle, NoBugTitle } from "./bugControlElements";
import { BugCard } from "./bugCard";
import { Footer } from "../../../components/Footer/Footer";

export const BugControl = ()=>{
    const [bugs, setBugs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ["All","Team Pages","Referee Pages","Community Page", "Profile Page","Login-SignUp","Other"];
    const toggling = () => setIsOpen(!isOpen);

    useEffect(() => {
        axios
            .get("https://mfga.herokuapp.com/bugs")
            .then( (res) => {
              const bugs = res.data;
              setBugs(bugs);
            })
            .catch((err) => {
              console.log(err);
            });
      }, []);


      if(bugs.length === 0){
        return(
            <ContainerDiv>
                <NoBugTitle>There is no bug report, Good job!</NoBugTitle>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>


                <Footer></Footer>
            </ContainerDiv>
        )
      }




    function createCard(bug) {
        return (
          <BugCard
            key={bug._id}
            id={bug._id}
            type={bug.type}
            time={bug.Time}

            comment = {bug.comment}
          />
        );
      }
      //Dropdown for bug types
      function mapBug(bug) {
        if(bug.isDone === false){
            if(bug.type === selectedOption){
                return 1;
            }
            if(selectedOption === "All" || selectedOption === null){
                return 1;
            }
        }
      }


    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
        console.log(selectedOption);
       
      };

    return(
        <ContainerDiv>
        <FilterTitle>Bug Type</FilterTitle>
        {bugs.filter((bug)=> mapBug(bug) === 1 ).map(createCard)}
        <DropDownContainer2>
            <DropDownHeader2 onClick={toggling}>
              {selectedOption||"All"}
         </DropDownHeader2>
         {isOpen && (
          <DropDownListContainer2>
            <DropDownList2>
              {options.map(option => (
                <ListItem2 onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </ListItem2>
              ))}
            </DropDownList2>
          </DropDownListContainer2>
        )}
      </DropDownContainer2>
      <br/>
      <br/>
      <br/>

      
        </ContainerDiv>
    )
}