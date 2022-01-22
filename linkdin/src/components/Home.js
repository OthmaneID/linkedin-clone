import styled from "styled-components";
import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Main from "./Main";
import { connect } from "react-redux";

const Home = (props) => {
  return (
    <Container>
      <Section>
        <h5>
          <a>Hiring in a hurry ? -</a>
        </h5>
        <p>find talented pros in record and keep business moving .</p>
      </Section>
      <Layout>
        <LeftSide />

        <Main />

        <RightSide />
      </Layout>
    </Container>
  );
};

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-rows: auto; */
  margin: 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    padding-bottom: 100px;
  }
`;

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: border-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
}

const mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateToProps)(Home);
