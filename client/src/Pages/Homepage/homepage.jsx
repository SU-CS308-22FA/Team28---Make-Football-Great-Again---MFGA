import axios from "axios";
import React, { useState, useEffect } from "react";
import { Footer } from "../../components/Footer/Footer";
import Loading from "../../components/Loading/loading";


import {
  ContainerDiv,
  Fixture,
  InnerContainer,
  RecentMatchButton,
  UpcomingMatch,
  UpComingMatchContainer,
} from "./HomepageElements";

const Homepage = () => {

  const [recentMatch, setRecentMatch] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:4000/recentmatch/getrecent");

      setRecentMatch(result.data);
    };


    fetchData();
  }, []);

  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  if(recentMatch.length === 0) {
    return <Loading></Loading>
  }
  // console.log(recentMatch)

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://mocki.io/v1/08c6b2bd-5741-4f67-af9f-7f3e1e981ee5",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            authorization:
              "apikey 0qgwoGwN5XRJLyE350RqVK:2YglBd0gvdT81TyM09iYlW",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("result is: ", JSON.stringify(result, null, 4));

      var res;

      for (res in result) {
        result[res].date = result[res].date.substring(0, 10);
        // console.log(result[res])
      }

      setData(result);

      console.log(result.length)
      for(var i = 0 ; i < result.length ; i++) {

        // console.log(result[i])
        var currentData = result[i];
        console.log(currentData)

        axios.post('http://localhost:4000/recentmatch/recent', currentData)
        .then((res) => {
          if(res.status === 200) {
            console.log(res.data)
          }else {
            console.log("Already exists");
          }
        }).catch((e) => {
          console.log(e);
        })

       }


    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  return (
    <>
      {err && <h2>{err}</h2>}
      {isLoading && <h2>Loading...</h2>}
      <ContainerDiv>
        <InnerContainer>
          <UpComingMatchContainer>
            <Fixture>Recent matches</Fixture>
            {recentMatch &&
              recentMatch.map((r) => (
                <UpcomingMatch key={r.home}>
                  {r.date} <br /> {r.away} - {r.home} <br/> {r.skor}
                </UpcomingMatch>
              ))}

              <RecentMatchButton onClick={handleClick}> Refresh Feed </RecentMatchButton>
          </UpComingMatchContainer>

        </InnerContainer>
        <Footer></Footer>
      </ContainerDiv>
    </>
  );
};

export default Homepage;
