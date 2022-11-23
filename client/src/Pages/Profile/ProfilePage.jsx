import React, { useState } from "react";
import axios from "axios";
import {
  DropDownList,
  standingsTitle,
  DropDownListContainer,
  UsernameTitle,
  ContainerCard,
  NameTitle,
  ContainerDiv,
  StyledButton,
  StyledNavLink,
  TeamTitle,
  ListItem,
  DropDownContainer,
  DropDownHeader,
  StandingCard,
} from "./ProfileElements";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import Loading from "../../components/Loading/loading";
import { useEffect } from "react";

export const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const email = user.email;
  const name = user.name;
  const username = user.username;
  const password = user.password;
  const role = user.role;
  const status = user.status;
  


  var team = user.team;

  const [u_teams, SetUteams] = useState([]);

  useEffect(() => {
    axios
    .get("https://mfga.herokuapp.com/profile")
    .then((res) => {
      const u_teams = res.data;
      SetUteams(u_teams);
      console.log(u_teams);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

  const [teamStat, setTeamStat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://mfga.herokuapp.com/stat/getStat");

      setTeamStat(result.data);
    };

    fetchData();
  }, []);


  const handleSubmit = (e) => {
    navigate("/edit");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    const Selectedteam = {
      team: value,
      email: email,
    };
    console.log(Selectedteam);
    axios
      .post("https://mfga.herokuapp.com/profile", Selectedteam)
      .then((response) => {
        window.alert("User successfully selected team");

        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: name,
            username:username,
            email: email,
            role: role,
            status: status,
            password: password,
            team: Selectedteam.team,
          })
        );
        navigate("/profileFront");

        
      });
  };



  if (user === null || user.email === null) {
    console.log("user is logged out from profile page")
    return <h1>Loading...</h1>
  }

  return (
    <ContainerDiv>
      <ContainerCard>
        <NameTitle>{user.name}</NameTitle>
        <TeamTitle>My Team</TeamTitle>
        <UsernameTitle>{user.username}</UsernameTitle>
        <DropDownContainer>
          <DropDownHeader onClick={toggling}>
            {user.team || "Select Team"}
          </DropDownHeader>
          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {u_teams.map((option) => (
                  <ListItem
                    onClick={onOptionClicked(option.name)}
                    key={Math.random()}
                  >
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
        {teamStat.filter(CurrentTeam => CurrentTeam.team === team.trim()).map(filteredTeam => (
          <StandingCard>
          <standingsTitle>Rank: {filteredTeam.rank}</standingsTitle>
          <standingsTitle>Win: {filteredTeam.win}</standingsTitle>
          <standingsTitle>Lose: {filteredTeam.lose}</standingsTitle>
          <standingsTitle>Draw: {filteredTeam.draw}</standingsTitle>
          <standingsTitle>Point: {filteredTeam.point}</standingsTitle>
        </StandingCard>
  ))}
        
      </ContainerCard>
    </ContainerDiv>
  );
};
