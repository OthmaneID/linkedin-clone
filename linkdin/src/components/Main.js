import styled from "styled-components";
import React, { useState } from "react";
import { connect } from "react-redux";
import PostModal from './PostModal'

const Main = (props) => {

  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case true:
        setShowModal(false);
        break;
      case false:
        setShowModal(true);
        break;
      default:
        setShowModal(false);
        break;
    }
  }

  return (
    <Container>
      <ShareBox>
        Share
        <div>
          {
            props.user && props.user.photoURL ? (<img src={props.user.photoURL} alt='' />)
              : (<img src="./images/user.svg" alt="" />)
          }
          <button
            onClick={handleClick}
          >Start a post</button>
        </div>
        <div>
          <button>

            <img src="./images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>

          <button>
            <img src="./images/video-icon.svg" alt="" />
            <span>Video</span>
          </button>

          <button>
            <img src="./images/event-icon.svg" alt="" />
            <span>Event</span>
          </button>
          <button>
            <img src="./images/article-icon.svg" alt="" />
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>
      <div>
        <Articale>
          <SharedActor>
            <a>
              <img src="./images/user.svg" alt="" />
              <div>
                <span>Title</span>
                <span>Info</span>
                <span>Date</span>
              </div>
            </a>
            <button>
              <img src="./images/elipsis.svg" alt="" />
            </button>
          </SharedActor>
          <Description>description</Description>
          <SharedImg>
            <a>
              <img src="./images/shared-image.jpg" alt="" />
            </a>
          </SharedImg>
          <SocialCounts>
            <li>
              <button>
                <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
                <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="" />
                <span>74</span>
              </button>
            </li>
            <li>
              <a>3 comments</a>
            </li>
          </SocialCounts>
          <SocialActions>
            <button>
              <img src="./images/like-icon.svg" alt="" />
              <span>Like</span>
            </button>
            <button>
              <img src="./images/comments-icon.svg" alt="" />
              <span>Comments</span>
            </button>
            <button>
              <img src="./images/share-icon.svg" alt="" />
              <span>Share</span>
            </button>
            <button>
              <img src="./images/send-icon.svg" alt="" />
              <span>Send</span>
            </button>
          </SocialActions>
        </Articale>
      </div>
      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgba(0 0 0/15%), 0 0 0 rgba(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0px;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
        cursor:pointer;
        &:hover{
          background-color: rgba(0, 0, 0, 0.06f );
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-left: 8px;
        padding-right: 8px;
        border-radius: 4px;
        img {
          margin: 0 4px 0 -2px;
          width: 25px;
        }
        span {
          color: #70b5f9;
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
`;

const Articale = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      span {
        font-weight: 600;
      }
    }

    @media (min-width: 768px) {
      width: 22%;

      span {
        margin-left: 8px;
      }
    }
  }
`;

const mapPropsToState = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToState = (dispatch) => ({});

export default connect(mapPropsToState)(Main);
