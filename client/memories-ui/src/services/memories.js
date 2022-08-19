import  api from "../api"

export const getAllMemories = (token, publicFeeds,search) => {
    return api.get(`/memories?publicFeeds=${publicFeeds}&search=${search}`, 
        { 
            headers : { "Authorization" : `Bearer ${token}` } 
        }
    );
}


export const createMemroies = (token, data) => {
    return api.post("/memories", 
        data,
        { 
            headers : { "Authorization" : `Bearer ${token}` } 
        }, 
    );
}


export const deleteMemories = (token, id) => {
    return api.delete("/memories", 
    
        { 
            headers : { "Authorization" : `Bearer ${token}` } ,
             params : { id } ,
        },
       
         
    );
}

export const postComments = (token, comment, postId) => {
    return api.post("/comments", 
    { comment, postId},
    { 
        headers : { "Authorization" : `Bearer ${token}` } 
    }, 
);
}


export const deleteComments = (token, memoryId, commentId) => {
    return api.delete("/comments", 
    
        { 
            headers : { "Authorization" : `Bearer ${token}` } ,
            params : { memoryId, commentId } ,
        },
    
        
    );
}