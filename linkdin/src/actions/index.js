import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { SET_USER } from "./actionType";

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