import React,{ useState} from "react";
import axios from "axios";
import {DropDownList,DropDownListContainer,UsernameTitle, ContainerCard, NameTitle, ContainerDiv,StyledButton,StyledNavLink,TeamTitle, ListItem,DropDownContainer,DropDownHeader} from "./ProfileElements";
import {useNavigate, useLocation} from 'react-router-dom';
import { Footer } from "../../components/Footer/Footer";



export const Profile=()=>{
    const location = useLocation();
const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("currentUser"));
const email = user.email; 
var team = user.team;

    const [u_teams,SetUteams] = useState([]);
    axios.get('http://localhost:4000/profile')
    .then(res =>{
        const u_teams = res.data;
        SetUteams(u_teams)
        console.log(u_teams)
    })
    .catch((err)=>{
        console.log(err);
    })




const handleSubmit = (e) => {
    navigate("/edit");
  };
  
    
 
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
        const Selectedteam ={
            team:value,
            email:email

        }
        console.log(Selectedteam)
        axios
        .post("http://localhost:4000/profile", Selectedteam)
        .then((response) => {
            window.alert("User successfully selected team")
            
          
            localStorage.setItem("currentUser", JSON.stringify({team: response.data.user.team}))
            localStorage.setItem("user", response.data.user);

        });

      

      };

return(
    <ContainerDiv>
    <ContainerCard>
    
        <NameTitle>{user.name}</NameTitle>
        <TeamTitle>My Team</TeamTitle>
        <UsernameTitle>{user.username}</UsernameTitle>
        <DropDownContainer>
        <DropDownHeader onClick={toggling}>{user.team||"Select Team"}</DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
            {u_teams.map(option => (
                <ListItem onClick={onOptionClicked(option.name)} key={Math.random()}>
                  {option.name}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
        <StyledNavLink active href="/edit">
            Edit
          </StyledNavLink>
    </ContainerCard>
    </ContainerDiv>
)


}