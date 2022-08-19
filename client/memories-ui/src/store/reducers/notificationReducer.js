export const notificationAction = {
    "ADD_MSG" : "ADD_MSG"
}

export const notificationInitialState = {
    item: null,
    id: 0
}

const notificationReducer = (state, action) => {

    const { type, title , content } = action.payload ? action.payload : {};

    switch(action.type) {
        case notificationAction.ADD_MSG:
            const newId = state.id + 1;
            let newItem = { type, title: `${title}`, content, id: newId };
          return {...state, id: newId, item : newItem };
          break;
        default:
          return state;
      }  
}

export default notificationReducer;