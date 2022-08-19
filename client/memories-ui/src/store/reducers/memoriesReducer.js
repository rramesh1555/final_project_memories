export const memoriesAction = {
    "MEMORIES_LOADING" : "MEMORIES_LOADING",
    "SET_MEMORIES" : "SET_MEMORIES",
    "SET_MEMORIES_ERROR" : "SET_MEMORIES_ERROR"
}

export const memoriesInitialState = {
    memories : [],
    date: Date,
    loading: false,
    isInit: false,
    error: ""
}

const memoriesReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case memoriesAction.MEMORIES_LOADING:
          return {...state, loading: true, memories: [], isInit : false};
          break;
        case memoriesAction.SET_MEMORIES:
            const { data, date} = payload;
          return {...state, memories : data, date : date, loading: false, isInit : true};
          break;
        case memoriesAction.SET_MEMORIES_ERROR:
            const { error } = payload;
          return {...state, error: error, isInit : true, loading: false};
          break;
        default:
          return state;
      }  
}

export default memoriesReducer;