import React, { useEffect, useState } from "react";
import "./profile.css"
import image from "../../images/sampleProfPic.jpg";
import ImgDisplay from "../common/imgDisplay";
import Footer from "../common/footer/footer";
import { getMyDetails, updateDetails, uploadAvatar } from "../../services/register";
import { useDataStore } from "../../store/storeContext";
import { notificationAction } from "../../store/reducers/notificationReducer";
import { messages, notificationType } from "../../constants/messages";

const Profile = () => {

    const [editModeDetails, setEditModeDetails] = useState(false);
    const [editModeCredentials, setEditModeCredentials] = useState(false);
    const [editModeAbout, setEditModeAbout] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    const [profilePicFile, setProfilePicFile] = useState("");
    const [state, dispatch] = useDataStore();
    const { loginReducer, notificationReducer } = state;

    const [userDetails, setUserDetails ] = useState(null);
    const [passwordMismatchErr, setPasswordMismatchErr ] = useState(null);


    const reader = new FileReader();

    reader.onload = () => {


        setProfilePic(reader.result);

    }

    const imgUploaded = (e, val) => {
        try {
            const imgInput = e.target.files[0];
            setProfilePicFile(imgInput)
            reader.readAsDataURL(imgInput);

        } catch (err) {
            console.log("error uploading file")
        }


    }

    const handleProfileReset = () => {
        setProfilePic(userDetails.avatar)
    }

    const saveForm = async (formDetailsToSave) => {
        try {
            const reponse = await updateDetails(loginReducer.accessToken, formDetailsToSave);
            dispatch({
                type : notificationAction.ADD_MSG,
                payload : {
                    title: messages.PROFILE_SAVE_SUCCESS,
                    type: notificationType.SUCCESS
                }
            });
            getUserDetails();
        } catch(err) {
            dispatch({
                type : notificationAction.ADD_MSG,
                payload : {
                    title: messages.PROFILE_SAVE_ERROR,
                    type: notificationType.ERROR
                }
            });
        }

    }

    const getUserDetails = async() => {
        try {
            const response = await getMyDetails(loginReducer.accessToken);
            setUserDetails(response.data);
            setProfilePic(response.data.avatar)

        } catch (err) {
            dispatch({
                type : notificationAction.ADD_MSG,
                payload : {
                    title: messages.PROFILE_ERROR,
                    type: notificationType.SUCCESS
                }
            });
        }
    }

    const handleDetailsSave = () => {
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const gender = document.getElementById("gender").value;
        const formDetailsToSave = {...userDetails, name, age , gender};
        setEditModeDetails(false);
        saveForm(formDetailsToSave);
    }

    const handleCredentialsSave = () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password1").value;
        const confirmPassword = document.getElementById("confirmPassword1").value;
        if(password !== "" && (confirmPassword !== password)) {
            setPasswordMismatchErr(true)
        } else {
            setPasswordMismatchErr(false);
            let formDetailsToSave = {...userDetails, email};
            if(password) {
                formDetailsToSave = {...formDetailsToSave, password}
            }

            setEditModeCredentials(false);
            saveForm(formDetailsToSave);
        }


    }

    const handleAboutSave = () => {
        const about = document.getElementById("about").value;
        const hobbies = document.getElementById("hobbies").value;

        const formDetailsToSave = {...userDetails, about , hobbies};
        setEditModeAbout(false);
        saveForm(formDetailsToSave);
    }

    const handleAvatarSave = async() => {
        const formDetailsToSave = {...userDetails, avatar : profilePic};
        saveForm(formDetailsToSave);

    }


    useEffect( () => {
        getUserDetails();
    }, []);


    return (
        <>
            {/* <h1>User Profile</h1> */}

            { userDetails && <div className="flex">
                <div className="avatarWrapper">
                    <figure>
                        <img src={profilePic ? profilePic : image} alt="profile Pic" />
                    </figure>
                    <div className="actionWrapper">
                        <div className="fileUploadWrapper" >
                            <div className="fileUpload">
                                <input id="avatarImag" type="file" onChange={(e) => imgUploaded(e)} />
                                <input type="text" style={{ display: "none" }} />
                            </div>
                            <button>Upload New Image</button>
                        </div>

                        <button disabled={!profilePic} onClick={handleProfileReset}>Reset</button>
                        <button disabled={!profilePic} onClick={handleAvatarSave} >Save</button>
                    </div>
                </div>

                <div className="detailsWrapper">

                    {
                        !editModeDetails ?
                            <>
                                <article>
                                    <h2>{userDetails.name}</h2>
                                    <p>{userDetails.age}</p>
                                    <p>{userDetails.gender}</p>

                                    <button className="small" onClick={() => setEditModeDetails(true)}>Edit personal details</button>
                                </article>
                            </>
                            :
                            <>
                                <article>
                                    <input type="text" id="name" placeholder="name" defaultValue={userDetails.name} />
                                    <input type="number" id="age" placeholder="age" defaultValue={userDetails.age} />

                                    <select id="gender" defaultValue={userDetails.gender}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <button className="small" onClick={handleDetailsSave} >Save persnoal Details</button>

                                </article>
                            </>
                    }

                    {
                        !editModeCredentials ?
                            <>
                                <article>
                                    <p>Email : {userDetails.email}</p>
                                    <p>Password : *********</p>

                                    <button className="small" onClick={() => setEditModeCredentials(true)}>Edit Credentials</button>
                                </article>
                            </> :
                            <>
                                <article>
                                    <input type="text" id="email" name="email" placeholder="Email" defaultValue={userDetails.email} />
                                    <input type="password" id="password1" name="password" placeholder="Password" autoComplete="off" defaultValue="" />
                                    <input type="password" id="confirmPassword1" placeholder="Confirm Password" autoComplete="off" defaultValue=""  />
                                    {passwordMismatchErr && <p class="error">Passwords must match</p> }
                                    <button className="small" onClick={handleCredentialsSave}>Save Credentials</button>

                                </article>
                            </>
                    }


                    {
                        !editModeAbout ?
                            <>
                                <article>
                                    <h2>About Me</h2>
                                    <p>{userDetails.about ? userDetails.about : "----"}</p>
                                    <p>Hobbies : <span>{userDetails.hobbies ? userDetails.hobbies : "----"}</span></p>

                                    <button className="small" onClick={() => setEditModeAbout(true)}>Edit About Me</button>
                                </article>
                            </> :

                            <>
                                <article>
                                    <textarea id="about" defaultValue={userDetails.about} />
                                    <input type="text" id="hobbies" placeholder="Hobbies" defaultValue={userDetails.hobbies} />
                                    <button className="small" onClick={handleAboutSave}>Save About Me</button>
                                </article>
                            </>
                    }
                </div>
            </div>}            
           <Footer/>
        </>
    )
};



export default Profile;