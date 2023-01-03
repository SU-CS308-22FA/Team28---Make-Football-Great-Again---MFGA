import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProSidebarProvider, Menu, MenuItem,} from "react-pro-sidebar";
// import { Button } from "reactstrap";
import { Footer } from "../../components/Footer/Footer";
import Loading from "../../components/Loading/loading";
import { AssistsCard, TopAssistCard } from "../../components/TopAssist/topAssistCard";
import { CustomAssistCard2, CustomAssistCardContainer, CustomAssistNameTitle, CustomAssistRankTitle, CustomAssistTeamTitle, CustomAssistTitle2 } from "../../components/TopAssist/topAssistCardElements";
import { TopScorerCard, ScorersCard} from "../../components/TopScorer/topScorerCard";
import { CustomCard2, CustomCardContainer, CustomEmptyContainer, CustomGoalTitle2, CustomNameTitle, CustomRankTitle, CustomTeamTitle } from "../../components/TopScorer/topScorerCardElements";
// import useFetch from "../../Hooks/useFetch";

import {
  ContainerDiv,
  CustomSidebar,
  LeagueTable,
  LeagueTableContainer,
  PRGlobalContainer,
  RefreshButton,
} from "./CurrentStatsElements";

const CurrentStats = () => {
  const [teamStat, setTeamStat] = useState([]);
  const [topScorerStat, setTopScorerStat] = useState([]);
  const [scorersStat, setScorersStat] = useState([]);
  const [topAssistStat, setTopAssistStat] = useState([]);
  const [assistsStat, setAssistsStat] = useState([]);
  const [isPlayer, setIsPlayer] = useState(false);
  const [isPlayerRender, setIsPlayerRender] = useState(false);
  var rank = 1;
  var rank2 = 1;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://mfga.herokuapp.com/stat/getStat");

      setTeamStat(result.data);

      //console.log(result.data)
    };
    fetchData();
    
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://mfga.herokuapp.com/api/getTopScorer");

      setTopScorerStat(result.data[0]);
      setScorersStat(result.data.slice(1));

      //console.log(result.data)
    };
    fetchData();
  }, []);

  console.log(topScorerStat)
  console.log(scorersStat)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://mfga.herokuapp.com/api/getTopAssist");

      setTopAssistStat(result.data[0]);
      setAssistsStat(result.data.slice(1));

      //console.log(result.data)
    };
    fetchData();
  }, []);

  console.log(topAssistStat)
  console.log(assistsStat)

  useEffect(() => {
    if (isPlayerRender) {
      console.log("rendered")
      setIsPlayerRender(false)
    }
  });

  const API_URL = "https://mocki.io/v1/05d02231-7231-407c-8245-e60595d5fa5f";

  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  if (teamStat.length !== 19) {
    return <Loading />; //load a loading page here
  }

  //console.log(teamStat.length)

  const handleClick = async () => {
    setIsLoading(true);
    // https://api.collectapi.com/sport/league?data.league=super-lig
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          authorization: "apikey 0qgwoGwN5XRJLyE350RqVK:2YglBd0gvdT81TyM09iYlW",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      //console.log('result is: ', JSON.stringify(result, null, 4));

      //console.log(API_URL)
      setData(result);

      for (var i = 0; i < result.result.length; i++) {
        var currentData = result.result[i];
        console.log(currentData);

        axios
          .post("https://mfga.herokuapp.com/stat/statOrder", currentData)
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data);
            } else {
              console.log("Already exists");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  function createScorersCard(scorer) {
    rank += 1;
    return (
      <ScorersCard
        key={scorer.player.id}
        rank = {rank}
        props={scorer}
      />
    );
  }

  function createAssistsCard(assist) {
    rank2 += 1;
    return (
      <AssistsCard
        key={assist.player.id}
        rank = {rank2}
        props={assist}
      />
    );
  }

  console.log([...teamStat].sort((a, b) => (a.rank < b.rank ? -1 : 1)));

  console.log(teamStat);
  console.log("dummy data" + data);

  return (
    <ProSidebarProvider>
      <PRGlobalContainer>
        <CustomSidebar>
              <Menu>
                <MenuItem
                  onClick={() => {
                  setIsPlayer(false);
                  setIsPlayerRender(true);
                }}
                >
                  {" "}
                  Standings{" "}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                  setIsPlayer(true);
                  setIsPlayerRender(true);
                }}
                >
                  {" "}
                  Player Statistics{" "}
                </MenuItem>
              </Menu>
          </CustomSidebar>
        {!isPlayer?
        <ContainerDiv>
      {err && <h2>{err}</h2>}
      {isLoading && <h2>Loading...</h2>}
      <LeagueTableContainer>
        <RefreshButton onClick={handleClick}>
          Refresh current stats feed
        </RefreshButton>
        <LeagueTable hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>MP</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
            {[...teamStat]
              .sort((a, b) => (a.rank < b.rank ? -1 : 1))
              ?.map((d) => (
                <tr key={d.rank}>
                  <th>{d.rank}</th>
                  <th>{d.team}</th>
                  <th>{d.play}</th>
                  <th>{d.win}</th>
                  <th>{d.draw}</th>
                  <th>{d.lose}</th>
                  <th>{d.goalfor}</th>
                  <th>{d.goalagainst}</th>
                  <th>{d.goaldistance}</th>
                  <th>{d.point}</th>
                </tr>
              ))}
          </thead>
          <tbody>
            {/* {data &&
              data.result.map((d) => (
                <tr>
                  <th scope="row">{d.rank}</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
              ))} */}
          </tbody>
        </LeagueTable>
      </LeagueTableContainer>
        </ContainerDiv>
        : <>
        <ContainerDiv>
            <CustomCardContainer>
              <TopScorerCard props={topScorerStat}></TopScorerCard>
              <CustomCard2>
                <CustomRankTitle>Rank</CustomRankTitle>
                <CustomTeamTitle>Team</CustomTeamTitle>
                <CustomNameTitle>Name Surname</CustomNameTitle>
                <CustomGoalTitle2>Goal</CustomGoalTitle2>
              </CustomCard2>
              {scorersStat.map(createScorersCard)}
            </CustomCardContainer>
            <CustomEmptyContainer></CustomEmptyContainer>

            <CustomAssistCardContainer>
              <TopAssistCard props={topAssistStat}></TopAssistCard>
              <CustomAssistCard2>
                <CustomAssistRankTitle>Rank</CustomAssistRankTitle>
                <CustomAssistTeamTitle>Team</CustomAssistTeamTitle>
                <CustomAssistNameTitle>Name Surname</CustomAssistNameTitle>
                <CustomAssistTitle2>Assist</CustomAssistTitle2>
              </CustomAssistCard2>
              {assistsStat.map(createAssistsCard)}
            </CustomAssistCardContainer>

        </ContainerDiv>
        </>
        }
        
      </PRGlobalContainer>
      <Footer></Footer>
    </ProSidebarProvider>
  );
};

export default CurrentStats;
