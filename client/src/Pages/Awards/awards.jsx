import React, { useEffect, useState } from "react";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import axios from "axios";
import {
  UnapplyAwardButton,
  FinishButton,
  AwardButton,
  CustomSidebar,
  PointsTitle,
  PRContainer,
  PRGlobalContainer,
} from "./awardsElements";
import { ActiveAwardCard } from "../../components/Awards/ActiveAward/activeAwardCard";
import {
  AdminDisp,
  DisplayAuth,
  UserDisp,
} from "../../components/PageDirect/NavbarDisplay";
import Loading from "../../components/Loading/loading";
import { OldAwardCard } from "../../components/Awards/OldAward/oldAwardCard";

export const Awards = () => {
  const [award, setAward] = useState({});
  const [oldAwards, setOldAwards] = useState([]);
  const [applied, setApplied] = useState(false);
  const [points, setPoints] = useState(0);
  const [isOldAwards, setIsOldAwards] = useState(false);
  const [isOldAwardsRender, setIsOldRewardsRender] = useState(false);
  const [isResFull, setisResFull] = useState([]);
  const [isFinished, setisFinished] = useState(false)

  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!isOldAwards) {
      axios
        .get("http://localhost:4000/api/currentAward")
        .then((res) => {
          setAward(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post("http://localhost:4000/api/isApplied", {
          email: user !== null ? user.email : "",
        })
        .then((res) => {
          setApplied(res.data);
          var array = [];
          array.push(res);
          setisResFull(array);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .post("http://localhost:4000/api/getPoints", {
          email: user !== null ? user.email : "",
        })
        .then((res) => {
          setPoints(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isOldAwardsRender) {
      console.log("here");
      axios
        .get("http://localhost:4000/api/oldAwards")
        .then((res) => {
          setOldAwards(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      if (oldAwards.length > 0) setIsOldRewardsRender(false);
    }
    if(isFinished){
        axios
        .get("http://localhost:4000/api/currentAward")
        .then((res) => {
          setAward(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
        setisFinished(false)
    }
  });

  if (award === {}) {
    return <Loading></Loading>;
  }
  
  if (award === null) {
    return (
      <ProSidebarProvider>
        <PRGlobalContainer>
          <CustomSidebar>
            <Menu>
              <MenuItem
                onClick={() => {
                  setIsOldAwards(false);
                  setIsOldRewardsRender(false);
                }}
              >
                {" "}
                Current Award{" "}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsOldAwards(true);
                  setIsOldRewardsRender(true);
                }}
              >
                {" "}
                Old Awards{" "}
              </MenuItem>
            </Menu>
          </CustomSidebar>
          {!isOldAwards ? (
            <>
              <PRContainer>There is no current award</PRContainer>
            </>
          ) : (
            <PRContainer>{oldAwards.map(createOldAwardCard)}</PRContainer>
          )}
        </PRGlobalContainer>
      </ProSidebarProvider>
    );
  }
  if (isResFull.length !== 1) {
    return <Loading></Loading>;
  }
  function createOldAwardCard(oldAward) {
    console.log(oldAward.title);
    return (
      <OldAwardCard
        key={oldAward._id}
        title={oldAward.title}
        image={oldAward.image}
        description={oldAward.description}
        pointsNeeded={oldAward.pointsNeeded}
        winner={oldAward.winner}
      />
    );
  }

  const handleApply = (e) => {
    e.preventDefault();
    if (points <= 0 || points < award.pointsNeeded) {
      window.alert("You don't have enough points");
    } else {
      axios
        .post("http://localhost:4000/api/applyAward", { email: user.email })
        .then((res) => {
          window.alert(res.data.message);
          console.log(award.pointsNeeded);
          setApplied(true);
          axios
            .post("http://localhost:4000/api/getPoints", {
              email: user !== null ? user.email : "",
            })
            .then((res) => {
              setPoints(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  };

  const handleUnapply = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/unapplyAward", { email: user.email })
      .then((res) => {
        window.alert(res.data.message);
        setApplied(false);
        axios
          .post("http://localhost:4000/api/getPoints", {
            email: user !== null ? user.email : "",
          })
          .then((res) => {
            setPoints(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  const handleFinish = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/finishApplication", {id: award._id})
    .then((res) => {
        setisFinished(true)
        window.alert("Application succesfully completed!")
    })
    .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ProSidebarProvider>
      <PRGlobalContainer>
        <CustomSidebar>
          <Menu>
            <MenuItem
              onClick={() => {
                setIsOldAwards(false);
                setIsOldRewardsRender(false);
              }}
            >
              {" "}
              Current Award{" "}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsOldAwards(true);
                setIsOldRewardsRender(true);
              }}
            >
              {" "}
              Old Awards{" "}
            </MenuItem>
          </Menu>
        </CustomSidebar>
        {!isOldAwards ? (
          <>
            <PRContainer>
              <ActiveAwardCard key={award._id} props={award}></ActiveAwardCard>
            </PRContainer>
            <DisplayAuth>
              <UserDisp>
                <PointsTitle>Your Total Points: {points}</PointsTitle>
              </UserDisp>
            </DisplayAuth>
            <DisplayAuth>
              <AdminDisp>
                <FinishButton onClick={handleFinish}>Finish Applications</FinishButton>
              </AdminDisp>
            </DisplayAuth>
            {!applied ? (
              <DisplayAuth>
                <UserDisp>
                  <AwardButton onClick={handleApply}>Apply Award</AwardButton>
                </UserDisp>
              </DisplayAuth>
            ) : (
              <DisplayAuth>
                <UserDisp>
                  <UnapplyAwardButton onClick={handleUnapply}>
                    Unapply Award
                  </UnapplyAwardButton>
                </UserDisp>
              </DisplayAuth>
            )}
          </>
        ) : (
          <PRContainer>{oldAwards.map(createOldAwardCard)}</PRContainer>
        )}
      </PRGlobalContainer>
    </ProSidebarProvider>
  );
};
