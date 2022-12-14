import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Button } from "reactstrap";
import { Footer } from "../../components/Footer/Footer";
import Loading from "../../components/Loading/loading";
// import useFetch from "../../Hooks/useFetch";

import {
  ContainerDiv,
  LeagueTable,
  LeagueTableContainer,
  RefreshButton,
} from "./CurrentStatsElements";

const CurrentStats = () => {
  const [teamStat, setTeamStat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:4000/stat/getStat");

      setTeamStat(result.data);

      //console.log(result.data)
    };

    fetchData();
  }, []);

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
          .post("http://localhost:4000/stat/statOrder", currentData)
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

  console.log([...teamStat].sort((a, b) => (a.rank < b.rank ? -1 : 1)));

  console.log(teamStat);
  console.log("dummy data" + data);

  return (
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
      <Footer />
    </ContainerDiv>
  );
};

export default CurrentStats;
