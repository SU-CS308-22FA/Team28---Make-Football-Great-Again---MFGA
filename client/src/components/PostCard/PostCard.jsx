import axios from "axios";
import React, { useState, useEffect } from "react";

import { FaHeart, FaComment, FaThumbsDown, FaThumbsUp, FaTrash, FaEdit} from "react-icons/fa";

import { Display, DisplayAuth } from "../PageDirect/NavbarDisplay";

import {
  CustomCard,
  CustomName,
  CustomContent,
  CustomLike,
  CustomComment,
  CustomCommentCount,
  CustomLikeCount,
  CustomLikeTitle,
  CustomDelete,
  CustomEdit,
  CustomEditInput,
  CustomDoneEdit,
} from "./PostCardElements";

export const PostCard = (props) => {
  const [likeCount, SetLikeCount] = useState(0);

  const checkUser = localStorage.getItem("currentUser");

  var email;

  if (checkUser) {
    email = JSON.parse(localStorage.getItem("currentUser")).email;
  } else {
    email = "anonym";
  }

  //   const user = JSON.parse(localStorage.getItem("currentUser"));

  const [likeData, setLikeData] = useState({
    postId: props.postId,
    userEmail: email,
  });

  const [isLiked, setIsLiked] = useState(props.isLiked);

  useEffect(() => {
    SetLikeCount(props.likeCount);
  }, []);

  const HandleLike = () => {
    SetLikeCount(likeCount + 1);

    axios
      .post("https://mfga.herokuapp.com/api/like", likeData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    setIsLiked(!isLiked);
  };

  const HandleUnlike = () => {
    SetLikeCount(likeCount - 1);
    axios.post("https://mfga.herokuapp.com/api/unlike", likeData)
    .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
      setIsLiked(!isLiked);
  }

  return (
    <CustomCard>
      <CustomName>{props.name}</CustomName>
      <CustomContent>{props.content}</CustomContent>
      {isLiked ? (
        <CustomLike onClick = {HandleUnlike}>
            <FaThumbsDown></FaThumbsDown>
        </CustomLike>
      ) : (
        <>
        <DisplayAuth>
          <CustomLike onClick={HandleLike}>
            <FaThumbsUp></FaThumbsUp>
          </CustomLike>
        </DisplayAuth>
        <Display>
            <CustomLikeTitle>
                Likes:
            </CustomLikeTitle>
        </Display>
        </>
      )}
      <CustomLikeCount>{likeCount}</CustomLikeCount>
    </CustomCard>
  );
};

export const ProfilePostCard = ({props, name, postId}) => {
  console.log(postId)
  const [isRender, setIsRender] = useState(true)
  const [isRenderAgain, setIsRenderAgain] = useState(false)
  
  useEffect(() => {
    if(isRenderAgain){
      props.content = newContent
      setIsRenderAgain(false);
    }
  });

  const HandleDelete = () => {
    setIsRender(false)
    axios
      .post("https://mfga.herokuapp.com/api/deletePost", {postId})
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [isEditRender, setIsEditRender] = useState(false)
  const [newContent, setNewContent] = useState(props.content)
  const HandleEdit = () => {
    setIsEditRender(true)
  };

  const HandleDoneEdit = (e) => {
    e.preventDefault();
    setIsEditRender(false)
    setIsRenderAgain(true)
    axios.post("https://mfga.herokuapp.com/api/updatePost", {postId, newContent})
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
  };

  return (
    <>
        {isRender ? (
      <>
        <CustomCard>
        <CustomDelete onClick={HandleDelete}><FaTrash style={{position: "relative",right: "0.3rem"}}></FaTrash></CustomDelete>
        <CustomName>{name}</CustomName>
        {!isEditRender?
        <>
        <CustomEdit onClick ={HandleEdit}> <FaEdit style={{position: "relative",right: "0.3rem"}}></FaEdit></CustomEdit>
        <CustomContent>{props.content}</CustomContent>
        </>
        :
        <>
        <CustomEditInput defaultValue={props.content} 
        onChange={(e)=> {setNewContent(e.target.value)}}>

        </CustomEditInput>
        <CustomDoneEdit onClick={HandleDoneEdit}>Done</CustomDoneEdit>
        </>
        }
        <CustomLikeTitle>
            Likes:
        </CustomLikeTitle>
        <CustomLikeCount>{props.likeCount}</CustomLikeCount>
      </CustomCard>
    </>
    ) :
    (<></>)
    }
    </>
  );
};

