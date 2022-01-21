import styled from "styled-components";
import React from "react";

const RightSide = () => {
  return (
    <Container>
      <FollowCard>rightSide</FollowCard>
    </Container>
  );
};

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgba(0 0 0/15%), 0 0 0 rgba(0 0 0 /20%);
  padding: 12px;
  
`;
const Container = styled.div`
  grid-area: rightside;
`;

export default RightSide;
