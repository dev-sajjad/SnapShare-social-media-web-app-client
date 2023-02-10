import * as actions from '../constants/actionTypes';
import { createUserWithEmailAndPassword, GoogleAuthProvider,  signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import { toast } from 'react-hot-toast';;

const provider = new GoogleAuthProvider();


// user sign up
export const signUp = (formData, navigate) => async (dispatch) => {
    
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      
      .then(async(result) => {
        const user = result.user;
        await updateProfile(user, {
          displayName: `${formData.firstName} ${formData.lastName}`,
        })
        
        dispatch({ type: actions.USER_SIGN_UP, payload: user });
        toast.success("User signed up successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        dispatch({ type: actions.USER_SIGN_UP_FAIL, payload: error.message });
      });
}


// user sign in
export const signIn = (formData, navigate) => async (dispatch) => {
    signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((result) => {
          const user = result.user;

            dispatch({type: actions.USER_SIGN_IN, payload: user});
            toast.success('User signed in successfully');
            navigate('/');

        }).catch((error) => {
            toast.error(error.message);
            dispatch({type: actions.USER_SIGN_IN_FAIL, payload: error.message})
        })
}


// google sign in
export const googleSignUp = (navigate) => (dispatch) => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
      
            dispatch({ type: actions.USER_SIGN_IN, payload: user });
            toast.success('Signed in successfully');
            navigate('/');
        })
          .catch((error) => {
              toast.error(error.message); 
          dispatch({ type: actions.USER_SIGN_IN_FAIL, payload: error.message });
        }); 
}

// sign out
export const signOutUser = (navigate) => (dispatch) => {
    signOut(auth)
        .then(() => {
          const message = "User sign out successfully!"
          // clear local storage 
          localStorage.removeItem('social-token');
          
          toast.success('User sign out successfully!')
          navigate('/auth');

          dispatch({type: actions.USER_SIGN_OUT, payload: message})
    }).catch(error => console.log(error.message))
}

