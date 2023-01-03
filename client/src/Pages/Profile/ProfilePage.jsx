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
  BackgroundImage,
  ProfileImage,
  PostsTitle,
  PostContainer,
} from "./ProfileElements";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import Loading from "../../components/Loading/loading";
import { useEffect } from "react";
import { ProfilePostCard } from "../../components/PostCard/PostCard";

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
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://mfga.herokuapp.com/stat/getStat");

      setTeamStat(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userPosts = await axios.post("https://mfga.herokuapp.com/api/getUserPost", {email});

      setUserPosts(userPosts.data.post);
    };

    fetchData();
  }, []);

  console.log(userPosts);

  function createCard(post) {
    const name = user.name;
    return (
      <ProfilePostCard
        key={post._id}
        props={post}
        name={name}
        postId={post._id}
      />
    );
  }

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
    <BackgroundImage src="https://thumbs.dreamstime.com/b/football-red-background-landscape-format-panoramic-banner-soccer-ball-black-white-artificial-turf-space-text-good-117406190.jpg"></BackgroundImage>
    <ProfileImage src="https://cdn-icons-png.flaticon.com/512/4978/4978390.png"></ProfileImage>
        <NameTitle>{user.name}</NameTitle>
        <TeamTitle>My Team</TeamTitle>
        <UsernameTitle>{user.username}</UsernameTitle>
        <PostsTitle>My Posts</PostsTitle>
        {userPosts.length === 0 ? <></> : <PostContainer>{userPosts.map(createCard)}</PostContainer>}
        {teamStat.filter(CurrentTeam => CurrentTeam.team === team.trim()).map(filteredTeam => (
          <StandingCard>
          <standingsTitle>Rank: {filteredTeam.rank}</standingsTitle>
          <standingsTitle>Win: {filteredTeam.win}</standingsTitle>
          <standingsTitle>Lose: {filteredTeam.lose}</standingsTitle>
          <standingsTitle>Draw: {filteredTeam.draw}</standingsTitle>
          <standingsTitle>Point: {filteredTeam.point}</standingsTitle>
        </StandingCard>
  ))}
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
          Edit Profile
        </StyledNavLink>

        
      
    </ContainerDiv>
  );
};
