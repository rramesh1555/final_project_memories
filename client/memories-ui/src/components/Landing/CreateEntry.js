import React, { useState, useRef, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { messages, notificationType } from "../../constants/messages";
import { pages } from "../../constants/pages";
import { createMemroies } from "../../services/memories";
import { notificationAction } from "../../store/reducers/notificationReducer";
import { useDataStore } from "../../store/storeContext";
import { getDateMax } from "../../utils/dateFn";
import ImgDisplay from "../common/imgDisplay";
import MemoryMenu from "../common/memoryMenu/index";
import Diary from '../Diary/index';
import Footer from "../common/footer/footer";

import "./memories.css"

const CreateEntry = () => {
    const imgUpload = useRef(null);
    const [state, dispatch] = useDataStore();
    const { loginReducer, notificationReducer } = state;
    const [ imgList, setImgList] = useState([]);

    const [dateDirty, setDateDirty] = useState();

    const reader = new FileReader();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors  },
    } = useForm();


    if(imgList.length === 0) {
        setValue("pics", null );
    }
   

    reader.onload = () => {

        let images = [...imgList];
         const newImg = {
             url : reader.result,
             caption: "sample caption"
         }
         images.push(newImg);
         setImgList(images);

         setValue("pics", images, { shouldValidate: true } );
     }
 

    const onSubmit = async (data) => {
        const ab = data;
        console.log(data)

        try {
            // let dataToSave = {...data};
            // dataToSave.pics = dataToSave.pics ? dataToSave.pics : {}
            const saveMemory = await createMemroies(loginReducer.accessToken, data);

            if (!saveMemory) {
               throw new Error("error saving")
            };
            
            dispatch({
                type : notificationAction.ADD_MSG,
                payload : {
                    title: messages.MEMORY_SAVE_SUCCESS,
                    type: notificationType.SUCCESS
                }
            });
        } catch (err) {

            dispatch({
                type : notificationAction.ADD_MSG,
                payload : {
                    title: messages.MEMORY_SAVE_ERROR,
                    type: notificationType.ERROR
                }
            });

        }
    }

    const contentUpdated = (updatedContent) => {
        setValue("description", updatedContent, { shouldValidate: true } );
    }

    const imgUploaded = (e, val) => {
        try {
            const imgInput = e.target.files[0];
            reader.readAsDataURL(imgInput);

        } catch(err) {
            console.log("error uploading file")
        }


    }

    const deleteImage = (index) => {
        let images = [...imgList];
        images.splice(index, 1);
        setImgList(images);
      //  imgUpload.current = null;
        setValue("pics", images, { shouldValidate: true } );
    }

    // useEffect(() => {
    //     setValue
    // }, []);

    const handleDateChange = () => {
        console.log("dsfds  ")
    }
    
    return (
        <>

            <MemoryMenu page={pages.CREATE_ENTRY} />


            {/* <h1>Create your memories</h1> */}

            <form className="createForm" onSubmit={handleSubmit(onSubmit)}> 

            <div className="formContent">
                <fieldset>
                    <label>Title</label>
                    <input autoComplete="off" {...register("title", { required: true })} />
                    {errors.title && <span className="error">Title is required.</span>}
                </fieldset>

                <fieldset>
                    <label>Type</label>
                    <select autoComplete="off" {...register("type")} >
                        <option value="casual">Casual</option>
                        <option value="relaxed">Relaxed</option>
                        <option value="stressful">Stressfull</option>
                        <option value="impEvent">Important Event</option>
                    </select>
                </fieldset>

                <fieldset>
                    <label>Feed is</label>
                    <select autoComplete="off" {...register("feedType")} >
                        <option value="private">private</option>
                        <option value="circle">circle</option>
                        <option value="public">public</option>
                    </select>
                </fieldset>


                <fieldset>
                    <label>Date and time</label>
                    <input className={dateDirty ? "dateDirty" : ""} type="datetime-local" onFocus={ () => setDateDirty(true)} {...register("timestamp")} />
                </fieldset>

                <fieldset>
                
                <label>Tags</label>
                <input autoComplete="off" {...register("tags")} />
            </fieldset>


                <ImgDisplay images={imgList} deleteImage={deleteImage} />

                <fieldset >
                    

                    <div className="fileUploadWrapper" >
                            <div className="fileUpload">
                            <input  id="avatarImag" type="file" onChange={(e) => imgUploaded(e)}  />
                            <input type="text" style={{display: "none"}}    {...register("pics")} />
                            </div>
                            <button>Upload New Image</button>
                        </div>
                </fieldset>
                </div>

                <div className="formContent">
                    <fieldset className="diaryField"  >
                    <label className="dairyLabel">Create a new memory</label>
                    <input type="text" style={{display: "none"}} {...register("description", { required: true })} />
                    <Diary contentUpdated={contentUpdated}></Diary>

                    {errors.description && <span className="error">Description is required.</span>}
                </fieldset>

                <input type="submit" />
                </div>
            </form>

            <Footer />
        </>
    )

  


};



export default CreateEntry;