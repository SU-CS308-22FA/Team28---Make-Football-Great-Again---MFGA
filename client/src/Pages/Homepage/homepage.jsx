import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Menu, ProSidebarProvider, SubMenu } from "react-pro-sidebar";
import { Button } from "reactstrap";
import { Footer } from "../../components/Footer/Footer";
import Loading from "../../components/Loading/loading";
import { NewsCard } from "../../components/News/NewsCard";

import {
  ContainerDiv,
  CustomHeaderTFFNews,
  CustomImage,
  CustomImageTFF,
  CustomSidebar,
  DeleteButton,
  Fixture,
  InnerContainer,
  NewsContainer,
  RecentMatchButton,
  TFFButton,
  UpcomingMatch,
  UpComingMatchContainer,
  StyledBackImage,
  CustomFeedImageTFF,
  StyledContainerTFFInfo,
} from "./HomepageElements";

const Homepage = () => {
  const [recentMatch, setRecentMatch] = useState([]);
  const [news, setNews] = useState([]);

  const [isNewsActive, setNewsActive] = useState(true);
  const [isNewsUseEffectActive, setNewsUseEffectActive] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:4000/recentmatch/getrecent"
      );

      setRecentMatch(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:4000/api/news");

      setNews(result.data);
    };

    fetchData();
  }, []);

  //Render Page According to the button press
  useEffect(() => {
    if (isNewsUseEffectActive) {
      setNewsUseEffectActive(false);
    }
  });

  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  // if (recentMatch.length === 0) {
  //   return <Loading></Loading>;
  // }

  if (news.length === 0) {
    return <Loading></Loading>;
  }
  // console.log(recentMatch)

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        // "https://mocki.io/v1/08c6b2bd-5741-4f67-af9f-7f3e1e981ee5",
        // "https://mocki.io/v1/4af3e014-9836-4c73-87e2-ae73ddcd0b82",
        "https://mocki.io/v1/35517c67-1619-433a-8041-3335aa592d3c",
        // 'https://api.collectapi.com/sport/results?data.league=super-lig',
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

      var result = await response.json();

      result = result["result"] //If YOU USE COLLECT API USE THIS COMMAND

      console.log("result is: ", JSON.stringify(result, null, 4));

      var res;

      for (res in result) {
        result[res].date = result[res].date.substring(0, 10);
        // console.log(result[res])
      }

      setData(result);
      console.log("result is: " + result);

      console.log(result.length);
      for (var i = 0; i < result.length; i++) {
        // console.log(result[i])
        var currentData = result[i];
        console.log(currentData);

        axios
          .post("http://localhost:4000/recentmatch/recent", currentData)
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

  console.log(data);
  console.log(news);

  return (
    <>
      <ProSidebarProvider>
        {err && <h2>{err}</h2>}
        {isLoading && <h2>Loading...</h2>}
        <ContainerDiv>
          <InnerContainer>
            {/* <CustomImage
              src="https://i.pinimg.com/originals/b2/7c/2d/b27c2d3cfbc89a37042cdc5a01be60c4.png"
              alt="PageImage"
            ></CustomImage> */}
            {isNewsActive ? (
              <NewsContainer>
                <DeleteButton
                  onClick={() => {
                    setNewsActive(false);
                    setNewsUseEffectActive(true);
                  }}
                >
                  <FaTimes
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: "3.89px",
                    }}
                  ></FaTimes>
                </DeleteButton>
                {[...news].map((n) => (
                  <NewsCard key={n.id} full_text={n.full_text} />
                ))}
              </NewsContainer>
            ) : (
              <>
                <CustomFeedImageTFF
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Turkish_Football_Federation_crest.svg/1200px-Turkish_Football_Federation_crest.svg.png"
                  alt="my image"
                  // onClick={this.myfunction}
                />
                <StyledContainerTFFInfo>
                  Türkiye Futbol Federasyonu (TFF), 23 Nisan 1923'te kurulan;
                  Türkiye'de futbol faaliyetlerini yürütmek, futbolun
                  gelişmesini ve yurt sathına yayılmasını sağlamak, bu konularda
                  her türlü düzenlemeyi yapmak, kararlar almak ve uygulamakla
                  yetkili kurumdur.
                </StyledContainerTFFInfo>
              </>
            )}

            <CustomSidebar>
              <CustomHeaderTFFNews>TFF NEWS</CustomHeaderTFFNews>
              <>
                <TFFButton
                  onClick={() => {
                    setNewsActive(true);
                    setNewsUseEffectActive(true);
                  }}
                >
                  <CustomImageTFF
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Turkish_Football_Federation_crest.svg/1200px-Turkish_Football_Federation_crest.svg.png"
                    alt="my image"
                    // onClick={this.myfunction}
                  />
                </TFFButton>
              </>
            </CustomSidebar>

            <UpComingMatchContainer>
              <Fixture>Recent matches</Fixture>
              {recentMatch &&
                [...recentMatch]
                  .sort((a, b) => (a.date < b.date ? 1 : -1))
                  ?.map((r) => (
                    <UpcomingMatch key={r.home}>
                      {r.date} <br /> {r.away} - {r.home} <br /> {r.skor}
                    </UpcomingMatch>
                  ))}

              <RecentMatchButton onClick={handleClick}>
                {" "}
                Refresh Feed{" "}
              </RecentMatchButton>
            </UpComingMatchContainer>
            <Footer></Footer>
          </InnerContainer>
        </ContainerDiv>
      </ProSidebarProvider>
    </>
  );
};

export default Homepage;
