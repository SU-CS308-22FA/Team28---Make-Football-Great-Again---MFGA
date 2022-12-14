import React, { useEffect, useState } from "react";
import { Button } from 'reactstrap';

import axios from "axios";

import {
  CustomSidebar,
  PostButton,
  PostContainer,
  GlobalContainer,
  CustomContainer,
  FilterButton,
  CustomButtonGroup,
  CustomRoleButton,
} from "./CommunityElements";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { PostCard } from "../../components/PostCard/PostCard";
import Loading from "../../components/Loading/loading";
import { PostForm } from "../../components/PostForm/PostForm";
import { DisplayAuth } from "../../components/PageDirect/NavbarDisplay";

import { Form, Checkbox } from "semantic-ui-react";

export const Community = () => {
  const checkUser = localStorage.getItem("currentUser");

  var [posts, SetPosts] = useState([]);
  const [isForm, setForm] = useState(false);

  const [checkValue, setCheckValue] = useState(0);

  //Below one is written for filter route, we will post it inside the filter button
  var [roleArray, SetRoleArray] = useState([]);

  const [isFiltered, setFiltered] = useState(false);

  const [cSelected, setCSelected] = useState([]);

  var email;

  if (checkUser) {
    email = JSON.parse(localStorage.getItem("currentUser")).email;
  } else {
    email = "anonym";
  }

  // console.log(isForm);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/getAllPost")
      .then((res) => {
        //console.log(res.data)
        var posts = res.data;
        SetPosts(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isFiltered) {
      // console.log(checkValue)

      axios
        .post("http://localhost:4000/api/filter", {
          likeCount: checkValue,
          roleArray: (cSelected.length > 0 ? cSelected: [0,1,2,3]),
        })
        .then((res) => {
          //console.log(res.data)
          var posts = res.data;
          SetPosts(posts);
        })
        .catch((err) => {
          console.log(err);
        });

      const array = [];
      SetRoleArray(array);

      setFiltered(false);
    }

    // console.log(cSelected);
  });

  if (posts === 0) {
    return <Loading></Loading>;
  }

  const CreatePostHandler = () => {
    setForm(!isForm);
  };

  function createCard(post) {
    var isLiked = false;

    for (var i = 0; i < post.likeUser.length; i++) {
      if (post.likeUser[i] === email) {
        isLiked = true;
      }
    }

    // console.log(isLiked);

    return (
      <PostCard
        key={post._id}
        name={post.postedBy.name}
        content={post.content}
        likeCount={post.likeCount}
        commentCount={post.commentCount}
        postId={post._id}
        isLiked={isLiked}
      />
    );
  }

  // console.log(isForm)
  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  };

  // const CheckBoxStatus = ({ label }) => {
  //   const [checked, setChecked] = useState(false);

  //   var role;

  //   if (checked) {
  //     if (label === "Admin") {
  //       role = 1;
  //     } else if (label === "Boardmember") {
  //       role = 2;
  //     } else if (label === "Referee") {
  //       role = 3;
  //     } else {
  //       role = 0;
  //     }

  //     const array = roleArray;
  //     array.push(role);
  //     SetRoleArray(array);

  //     console.log("IF: " + roleArray);
  //   } else {
  //     if (label === "Admin") {
  //       role = 1;
  //       const indx = roleArray.indexOf(role);
  //       if (indx > -1) {
  //         roleArray.splice(indx, 1);
  //       }
  //       SetRoleArray(roleArray);
  //       console.log("ELSE: " + roleArray);
  //     } else if (label === "Boardmember") {
  //       role = 2;
  //       const indx = roleArray.indexOf(role);
  //       if (indx > -1) {
  //         roleArray.splice(indx, 1);
  //       }
  //       SetRoleArray(roleArray);
  //       console.log("ELSE: " + roleArray);
  //     } else if (label === "Referee") {
  //       role = 3;
  //       const indx = roleArray.indexOf(role);
  //       if (indx > -1) {
  //         roleArray.splice(indx, 1);
  //       }
  //       SetRoleArray(roleArray);
  //       console.log("ELSE: " + roleArray);
  //     } else {
  //       role = 0;
  //       const indx = roleArray.indexOf(role);
  //       if (indx > -1) {
  //         roleArray.splice(indx, 1);
  //       }
  //       SetRoleArray(roleArray);
  //       console.log("ELSE: " + roleArray);
  //     }
  //   }

  //   return (
  //     <div>
  //       <input
  //         type="checkbox"
  //         checked={checked}
  //         onChange={() => setChecked(!checked)}
  //       />
  //       <span>{label}</span>
  //     </div>
  //   );
  // };

  const FilterRequest = () => {
    setFiltered(true);
  };

  return (
    <ProSidebarProvider>
      {!isForm ? (
        <GlobalContainer>
          <CustomContainer>
            <CustomSidebar>
              <Menu>
                {/* <SubMenu label="Filter by comment count">
                  <MenuItem> <CheckBox label={15}/> </MenuItem>
                  <MenuItem> <CheckBox label={10}/> </MenuItem>
                  <MenuItem> <CheckBox label={5}/> </MenuItem>
                </SubMenu> */}
                <SubMenu label="Filter by like count">
                  <Form>
                    <Form.Field>
                      <Checkbox
                        radio
                        label="More than 30"
                        name="checkboxRadioGroup"
                        value={30}
                        checked={checkValue === 30}
                        onChange={(e, data) => setCheckValue(data.value)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        radio
                        label="More than 20"
                        name="checkboxRadioGroup"
                        value={20}
                        checked={checkValue === 20}
                        onChange={(e, data) => setCheckValue(data.value)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        radio
                        label="More than 10"
                        name="checkboxRadioGroup"
                        value={10}
                        checked={checkValue === 10}
                        onChange={(e, data) => setCheckValue(data.value)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        radio
                        label="All"
                        name="checkboxRadioGroup"
                        value={0}
                        checked={checkValue === 0}
                        onChange={(e, data) => setCheckValue(data.value)}
                      />
                    </Form.Field>
                  </Form>
                </SubMenu>
                <SubMenu label="Filter by Status">
                  <CustomButtonGroup>
                    <CustomRoleButton
                      color="primary"
                      outline
                      onClick={() => onCheckboxBtnClick(0)}
                      active={cSelected.includes(0)}
                    >
                      User
                    </CustomRoleButton>
                    <CustomRoleButton
                      color="primary"
                      outline
                      onClick={() => onCheckboxBtnClick(1)}
                      active={cSelected.includes(1)}
                    >
                      Admin
                    </CustomRoleButton>
                    <CustomRoleButton
                      color="primary"
                      outline
                      onClick={() => onCheckboxBtnClick(2)}
                      active={cSelected.includes(2)}
                    >
                      Boardmember
                    </CustomRoleButton>
                    <CustomRoleButton
                      color="primary"
                      outline
                      onClick={() => onCheckboxBtnClick(3)}
                      active={cSelected.includes(3)}
                    >
                      Referee
                    </CustomRoleButton>
                  </CustomButtonGroup>
                </SubMenu>

                <FilterButton onClick={FilterRequest}>Filter</FilterButton>

                <DisplayAuth>
                  <PostButton onClick={CreatePostHandler}>
                    Create Post
                  </PostButton>
                </DisplayAuth>
              </Menu>
            </CustomSidebar>
          </CustomContainer>

          <PostContainer>
            {[...posts]
              .sort((a, b) => (a.rank < b.rank ? 1 : -1))
              ?.map(createCard)}
          </PostContainer>
        </GlobalContainer>
      ) : (
        <PostForm isForm={isForm} />
      )}
    </ProSidebarProvider>
  );
};
