import { signInWithPopup } from "firebase/auth";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { auth, provider, storage } from "../firebase";


export const setUser = (payload) => ({
  type: "SET_USER",
  user: payload,
});

export function SignInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
};

export const getUserAuth = () => {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user))
      }
    })
  }
}

export const SignOutAPI = () => {
  return (dispatch) => {
    auth.signOut().then(() => {
      dispatch(setUser(null))
    }).catch(error => {
      console.log(error.message)
    });
  };
};

export const postArticalAPI = (payload) => {
  return dispatch => {
    // this runs if the user is trying to uploa an image in his post

    if (payload.image != '') {

      const imagePath = payload.image + Timestamp.now();
      const storageRef = ref(storage, `images/${imagePath}`);

      const uploadTask = uploadBytesResumable(storageRef, payload.image);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(`ERROR : ${error}`)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);

            async function addPost(URL) {

              const postData = {
                actor: {
                  description: payload.user.email,
                  title: payload.user.displayName,
                  date: payload.timestamp,
                  image: payload.user.photoURL
                },
                video: payload.video,
                sharedImg: URL,
                comments: 0,
                description: payload.description
              }
              const newPostRef = doc(collection(db, "articles"));

              await setDoc(newPostRef, postData)
                .then(post => console.log(`POST : ${JSON.stringify(postData)}`))
                .catch(error => console.log(`adding post failed : ${error.message}`))
            } 
            addPost(downloadURL);

          });
        }
      );

    }
  }
}