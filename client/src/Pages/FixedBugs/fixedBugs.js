import React,{useState,useEffect} from "react";
import axios from "axios";
import { ContainerDiv, Title } from "./fixedBugsElements";
import { FixedCard } from "./FixedCard/fixedCard";
import { Footer } from "../../components/Footer/Footer";


export const FixedBugs = ()=>{
    const [bugs,setBugs] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:4000/fixBug")
            .then( (res) => {
              const bugs = res.data;
              setBugs(bugs);
            })
            .catch((err) => {
              console.log(err);
            });
      }, []);
      function createCard(bug){
        return(<FixedCard
            key={bug._id}
            id={bug._id}
            type={bug.type}
            time={bug.Time}
            comment = {bug.comment}
          />
        )
      }

      return(
        <ContainerDiv>
        <Title>Fixed Bugs</Title>
        {bugs.map(createCard)}
        </ContainerDiv>
        
      )

}