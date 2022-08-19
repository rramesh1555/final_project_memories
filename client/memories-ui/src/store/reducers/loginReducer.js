export const loginAction = {
    "SET_TOKEN" : "SET_TOKEN"
}

export const loginInitialState = {
    accessToken : null,
    name : null,
    avatar: null
}

const loginReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case loginAction.SET_TOKEN:
          return {...state, accessToken : payload.token, name : payload.name, avatar : payload.avatar  };
          break;
        default:
          return state;
      }  
}

export default loginReducer;