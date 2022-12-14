import React from "react";
import { Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem } from "reactstrap";

export const ActiveAwardCard = ({props}) => {
  return (
    <Card
      style={{
        width: "23rem",
        height: "35rem",
      }}
    >
      <img alt="Card" src={props.image} />
      <CardBody>
        <CardTitle tag="h5">Title: {props.title}</CardTitle>
        <CardText>Description: {props.description}</CardText>
      </CardBody>
      <ListGroup flush>
        <ListGroupItem>Points Needed: {props.pointsNeeded}</ListGroupItem>
      </ListGroup>
    </Card>
  );
};
