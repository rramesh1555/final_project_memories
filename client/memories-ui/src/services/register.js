import  api from "../api"

export const registerUser = (data) => {
        return api.post("/register", {data});
}

export const getMyDetails = (token) => {
        return api.get("/getMyDetails",  { 
                headers : { "Authorization" : `Bearer ${token}` } 
            });
}

export const updateDetails = (token, data) => {


            return api.post("/updateDetails", 
        data,
        { 
            headers : { "Authorization" : `Bearer ${token}` } 
        }, 
    );
}


export const uploadAvatar = (token, data) => {

        return api.post("/avatar", 
        data,
    { 
        headers : { "Authorization" : `Bearer ${token}` } 
    }, 
);
}