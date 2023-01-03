import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContainerDiv,DataDiv,SearchButton,SearchDiv, SearchInput, SearchLogo, SmallDataA,SmallDataP, Title } from "./searchPageElements";
import { Footer } from "../../components/Footer/Footer";



export const Search = ()=>{
    const navigate = useNavigate();
    const [data,setData] = useState([])
    const [filteredData,setFiltered] = useState([])
    useEffect(() => {
        axios
            .get("https://mfga.herokuapp.com/searchData")
            .then( (res) => {
              const data = res.data;
              setData(data);
            })
            .catch((err) => {
              console.log(err);
            });
      }, []);

      const handleFilter =(event)=>
      {
        const searchWord = event.target.value;
        const newFilter = data.filter((value)=>{
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if(searchWord === ""){
            setFiltered([]);
        }else{
            setFiltered(newFilter);
        }
        

      }
      const handleSubmit = (e)=>{
       
        const needs = {
            name: e,
        }
        axios
        .post("https://mfga.herokuapp.com/searchData/count", needs)
        .then((res) => {
          if(res.status===200){
             console.log("count added !");
          }
          else{
              console.log("Error happened, cannot add count!");
          }
        
        });
      }



    return(
        <ContainerDiv>
        <Title>Search Engine 🔍</Title>
            <SearchDiv>
                <SearchInput name = "search" type = "text" placeholder = "Enter something that you want to find..." onChange ={handleFilter}/>
            </SearchDiv>
            {filteredData.length != 0 && (
            <DataDiv>
                {filteredData.slice(0,15).map((value,key) =>{
                    return(<SmallDataA name={value.name} href={"https://mfga.herokuapp.com"+value.route}>
                    <SmallDataP>{value.name}</SmallDataP>
                    </SmallDataA>
                    );
                })}
            </DataDiv>
            )}
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
            <br/>
            <br/>
            <br/>
            
        </ContainerDiv>
    )
}