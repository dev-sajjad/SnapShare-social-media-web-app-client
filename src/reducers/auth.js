import * as actions from '../constants/actionTypes';

const initialState = {
    currentUser: null,
    error: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.USER_SIGN_UP:
        case actions.USER_SIGN_IN:
        case actions.AUTH_USER:
        return { ...state, currentUser: action?.payload };

        case actions.USER_SIGN_UP_FAIL:
        case actions.USER_SIGN_IN_FAIL:
        return { ...state, error: action?.payload };

      case actions.USER_SIGN_OUT:
            return { ...state, currentUser: null };

      default:
        return state;
    }
}

export default authReducer;