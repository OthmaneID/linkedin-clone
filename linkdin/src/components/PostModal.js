import styled from "styled-components";
import React, { useState } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { postArticalAPI } from "../actions";
import { Timestamp } from "firebase/firestore/lite";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is ${typeof image}`);
      return;
    }
    setShareImage(image);
  };
  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArtical = (e) => {
    e.preventDefault();
    console.log("hi 1");
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: Timestamp.now(),
    };
    props.postArticale(payload);
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    props.handleClick(e);
  };
  return (
    <>
      {props.showModal === true && (
        <Container>
          <Content>
            <Header>
              <h2>Create a Post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="./images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="./images/user.svg" alt="" />}
                {props.user && props.user.displayName ? <span>{props.user.displayName}</span> : <span>Name</span>}
              </UserInfo>
              <Editor>
                <textarea autoFocus={true} value={editorText} onChange={(e) => setEditorText(e.target.value)} placeholder="What do you want to talk about?" />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input type="file" accept="image/Gif,image/jpeg,image/jpg,image/png" name="image" id="file" style={{ display: "none" }} onChange={handleChange} />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                    </p>
                    {/* Displaying the selected image  */}
                    {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input type="text" placeholder="Please input a video link " value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
                      {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="./images/shared-image.svg" alt="" />
                </AssetButton>

                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="./images/shared-video.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="./images/share-comment.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton onClick={(e) => postArtical(e)} disabled={!editorText ? true : false}>
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    background-color: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition-duration: 170ms;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    svg,
    img {
      pointer-events: none;
    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background-color: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
  }
`;
const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    border-radius: 15px;
    padding-left: 8px;
    padding-right: 8px;
    svg {
      margin-right: 5px;
    }
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
  color: white;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#004182")};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    padding: 8px;
    border: none;
    &:focus {
      outline: none;
    }
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapDispatchToProps = (dispatch) => ({
  postArticale: (payload) => dispatch(postArticalAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
