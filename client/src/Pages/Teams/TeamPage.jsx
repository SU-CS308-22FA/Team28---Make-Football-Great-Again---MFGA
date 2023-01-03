import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ContainerDiv,
  PlayerTitle,
  StyledHr,
  TeamCard,
  TeamImg,
  TeamNameTitle,
  StatsTitle,
  StandingCard,
  ImgBox,
  TeamContainer,
  StatContainer,
  PlayerContainer,
  RankTitle,
  WinTitle,
  LoseTitle,
  DrawTitle,
  PointTitle,
  PostContainer,
  InfoContainer,
  StyledP,
} from "./teamsElements";
import { PlayerCard } from "./PlayerCard";
import CustomPaginationActionsTable from "../../components/MUITable/CustomMuıTable";
import { TeamPostCard } from "../../components/TeamPost/TeamPostCard";

import {FaTwitter} from 'react-icons/fa'
import Loading from "../../components/Loading/loading";


//Material UI packets

var stop = true;
export const TeamPage = () => {
  const [players, SetPlayers] = useState([]);
  const { team } = useParams();

  var teamURL = "";
   var teamImage;
  const [tweetArray, setTweetArray] = useState([]);



  const [teamsInfo, SetTeamInfo] = useState([]);
  const [teamsName, SetName] = useState([]);
  const [teamsImg, SetImg] = useState([]);
  const [isContentDownloaded, setIsContentDownloaded] = useState(true);


  useEffect(() => {
    axios
      .get("https://mfga.herokuapp.com/profile")
      .then((res) => {
        const teamsInfo = res.data;
        SetTeamInfo(teamsInfo);
        teamsInfo.forEach((element) => {
          var cleanName = element.name;
          cleanName = cleanName.replace(" ", "");
          cleanName = cleanName.replace(" ", "");
          cleanName = cleanName.replace(" ", "");
          if (cleanName === team) {
            SetName(element.name);
            SetImg(element.url);
            SetTeamInfo(element.content)
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://mfga.herokuapp.com/teams/" + team)
      .then((res) => {
        const players = res.data;
        SetPlayers(players);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [teamStat, setTeamStat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://mfga.herokuapp.com/stat/getStat");

      setTeamStat(result.data);
    };

    fetchData();
  }, []);


  useEffect(()=> {
    if(teamURL != "" && isContentDownloaded) {
     
     const fetchData = async () => {
       const result = await axios.post("https://mfga.herokuapp.com/api/teamPosts", {screen_name: teamURL});
 
       setTweetArray(result.data);
     };
 
     fetchData();
 
     setIsContentDownloaded(false);
    } 
   })  
 

  if(team === 'Galatasaray') {
    console.log("Team is Galatasaray")
    teamURL = "GalatasaraySK";
    teamImage= "https://pbs.twimg.com/profile_images/1583812988913549312/AMcNHO2m_400x400.jpg";
  }
  else if(team === 'Fenerbahçe') {
    console.log("Team is Fenerbahce, the best one ;)")
    teamURL = "Fenerbahce";
    teamImage= "https://pbs.twimg.com/profile_images/1588788006181289984/u6DVguqX_400x400.jpg";
  }
  else if(team === 'AdanaDemirspor') {
    console.log("Team is AdanaDemirspor")
    teamURL = "AdsKulubu";
    teamImage = "https://pbs.twimg.com/profile_images/1591148777834008576/ANiwB3sN_400x400.jpg";
  }
  else if(team === 'Konyaspor') {
    console.log("Team is Konyaspor")
    teamURL = "konyaspor";
    teamImage = "https://pbs.twimg.com/profile_images/1586477705226338304/qa_l2NiN_400x400.jpg";
  }
  else if(team === 'Kayserispor') {
    console.log("Team is Kayserispor")
    teamURL = "KayserisporFK"
    teamImage = "https://pbs.twimg.com/profile_images/1590812302533599240/s2WbT0oZ_400x400.jpg"
  }
  else if(team === 'Başakşehir') {
    console.log("Team is Başakşehir")
    teamURL = 'ibfk2014'
    teamImage = "https://pbs.twimg.com/profile_images/1586600513897889792/1LpkEZAc_400x400.jpg"
  }
  else if(team === 'Trabzonspor') {
    console.log("Team is Trabzonspor")
    teamURL = "Trabzonspor"
    teamImage = "https://pbs.twimg.com/profile_images/1598327122254340096/w7vIgKAG_400x400.jpg"
  }
  else if(team === 'Beşiktaş') {
    console.log("Team is Beşiktaş")
    teamURL = "Besiktas"
    teamImage = "https://pbs.twimg.com/profile_images/1596831110486532098/GSvoGPir_400x400.jpg"
  }
  else if(team === 'Alanyaspor') {
    console.log("Team is Alanyaspor")
    teamURL = "Alanyaspor"
    teamImage = "https://pbs.twimg.com/profile_images/1495735569216847874/Lvz2Conl_400x400.jpg"
  }
  else if(team === 'GaziantepFK') {
    console.log("Team is GaziantepFK")
    teamURL = "GaziantepFK"
    teamImage = "https://pbs.twimg.com/profile_images/1607264786261180416/exQo7Y6A_400x400.jpg"
  }
  else if(team === 'Antalyaspor') {
    console.log("Team is Antalyaspor")
    teamURL = "Antalyaspor"
    teamImage = "https://pbs.twimg.com/profile_images/1590814956869525522/HnOOEekG_400x400.jpg"
  }
  else if(team === 'Giresunspor') {
    console.log("Team is Giresunspor")
    teamURL = "Giresunspor"
    teamImage = "https://pbs.twimg.com/profile_images/1549048092107984899/CWXiIuDQ_400x400.jpg"
  }
  else if(team === 'Kasımpaşa') {
    console.log("Team is Kasımpaşa")
    teamURL = "kasimpasa"
    teamImage = "https://pbs.twimg.com/profile_images/1245827088977887232/BJtMcpOj_400x400.jpg"
  }
  else if(team === 'Hatayspor') {
    console.log("Team is Hatayspor")
    teamURL = "Hatayspor_FK"
    teamImage = "https://pbs.twimg.com/profile_images/1585912405497880582/2QgkunEW_400x400.jpg"
  }
  else if(team === 'Karagümrük') {
    console.log("Team is Karagümrük")
    teamURL = "karagumruk_sk"
    teamImage = "https://pbs.twimg.com/profile_images/1426106954552942593/J5lgf7LT_400x400.jpg"
  }
  else if(team === 'MKEAnkaragücü') {
    console.log("Team is MKEAnkaragücü")
    teamURL = "Ankaragucu"
    teamImage = "https://pbs.twimg.com/profile_images/1606795470831058944/Tvu8XVm3_400x400.jpg"
  }
  else if(team === 'Sivasspor') {
    console.log("Team is Sivasspor")
    teamURL = "Sivasspor"
    teamImage = "https://pbs.twimg.com/profile_images/1406835257870008326/GwC1xpVG_400x400.jpg"
  }
  else if(team === 'Ümraniyespor') {
    console.log("Team is Ümraniyespor")
    teamURL = "Umraniyespor"
    teamImage = "https://pbs.twimg.com/profile_images/1585262526958297088/pWOb0KWU_400x400.jpg"
  }
  else if(team === 'İstanbulspor') {
    console.log("Team is İstanbulspor")
    teamURL = "istanbulspor"
    teamImage = "https://pbs.twimg.com/profile_images/1590980260543320072/LomhiDQ3_400x400.jpg"
  }
  console.log(tweetArray)


  if(players.length === 0) {
    return <Loading></Loading>
  }

  if(tweetArray.length !== 5) {
    return <Loading></Loading>
  }

  return (
    <ContainerDiv>
      <ImgBox></ImgBox> {/*Not functional, just styling */}
      <TeamContainer></TeamContainer> {/*Not functional, just styling */}
      <StatContainer></StatContainer> {/*Not functional, just styling */}
      <InfoContainer><StyledP>{teamsInfo}</StyledP></InfoContainer> {/*Not functional, just styling */}
      <PlayerContainer></PlayerContainer> {/*Not functional, just styling */}
      <TeamImg src={teamsImg} />
      <TeamNameTitle>{teamsName}</TeamNameTitle>
      <PlayerTitle>Players</PlayerTitle>
      <StatsTitle>Stats</StatsTitle>
      {teamStat
        .filter((CurrentTeam) => CurrentTeam.team === team.trim())
        .map((filteredTeam) => (
          <>
            {/* {console.log(filteredTeam)} */}

              <RankTitle>Rank: {filteredTeam.rank}</RankTitle>
              <WinTitle>Win: {filteredTeam.win}</WinTitle>
              <LoseTitle>Lose: {filteredTeam.lose}</LoseTitle>
              <DrawTitle>Draw: {filteredTeam.draw}</DrawTitle>
              <PointTitle>Point: {filteredTeam.point}</PointTitle>

          </>
        ))}
      <StyledHr></StyledHr>
      {/* {players.map(createCard)} */}

      <CustomPaginationActionsTable players={players} team={team}></CustomPaginationActionsTable>

      <PostContainer>
          <FaTwitter style={{
            position: "absolute",
            width: "5rem",
            height: "2rem",
            left: "1rem",
            top: "1rem",
            color: "rgb(29, 155, 240)",
          }}></FaTwitter>


          {[...tweetArray].map((t) => (
            <TeamPostCard content={t.full_text} imageURL={teamImage}></TeamPostCard>
          ))}

      </PostContainer>


    </ContainerDiv>
  );
};
