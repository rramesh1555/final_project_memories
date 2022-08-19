import React, { useEffect, useState } from "react";
import { deleteComments, deleteMemories, getAllMemories, postComments, searchMemories } from "../../services/memories";
import { useDataStore } from "../../store/storeContext";
import { memoriesAction} from "../../store/reducers/memoriesReducer";
import { getDateFormatted} from '../../utils/dateFn'

import "./memories.css"
import Footer from "../common/footer/footer";
import MemoryMenu from "../common/memoryMenu/index";
import { pages } from "../../constants/pages";
import { notificationAction } from "../../store/reducers/notificationReducer";
import { messages, notificationType } from "../../constants/messages";
import Comments from "./comments";
import {FiX} from "react-icons/fi";


import SimpleImageSlider from "react-simple-image-slider";

const Landing = ( {location}) => {

    const  publicFeeds  =  location.state && location.state.publicFeeds ? location.state.publicFeeds : false;

    const [ state, dispatch ] = useDataStore();

    const { loginReducer, memoriesReducer, notificationReducer } = state;

    const { memories, loading, isInit } = memoriesReducer;

    const [searchString , setSearchString] = useState("")


    

    const currentDate = new Date();

    const deleteFeeds = async (id) => {
        try {
            const memoriesDelete = await deleteMemories(loginReducer.accessToken, id);

           dispatch({
                type : notificationAction.ADD_MSG,
                payload : {
                    title: messages.MEMORY_DELETE,
                    type: notificationType.SUCCESS
                }
            });

           

            if(!memories) {
                dispatch({
                    type : notificationAction.ADD_MSG,
                    payload : {
                        title: messages.MEMORY_DELETE_NOT_FOUND,
                        type: notificationType.ERROR
                    }
                });
    
            }

            getMemoriesApi();
        } catch(err) {
            dispatch({
                type : notificationAction.ADD_MSG,
                payload : {
                    title: messages.MEMORY_DELETE_ERROR,
                    type: notificationType.ERROR
                }
            });
        }
    }

    const getMemoriesApi = async (isInit) => {
        dispatch({
            type : memoriesAction.MEMORIES_LOADING
            
        })
        try {
            const memories = await getAllMemories(loginReducer.accessToken, publicFeeds, isInit ? "" : searchString);

            if(!memories) {
                throw new Error("memories not availble")
            }

            dispatch({
                type : memoriesAction.SET_MEMORIES,
                payload : {
                    data: memories.data,
                    date : currentDate
                }
            })
        } catch(err) {
            dispatch({
                type : memoriesAction.SET_MEMORIES_ERROR,
                payload : {
                    error : "Error loading memories"
                }
            })
        }
    }


    useEffect( () => {
        setSearchString("");
        getMemoriesApi(true);
    }, [publicFeeds]);

    const postComment = async (itemId, comment) => {
            try {
               const isCommentPosted  = await postComments(loginReducer.accessToken, comment, itemId);

               if(!isCommentPosted) {
                   throw new Error("Error posting comments")
               }

               getMemoriesApi();
            } catch(err) {
                console.log(err)
            }
        
    }

    const deleteComment = async (memoryId, commentId) => {
        try {
           const isCommentDeleted  = await deleteComments(loginReducer.accessToken, memoryId, commentId);

           if(!isCommentDeleted) {
               throw new Error("Error posting comments")
           }

           getMemoriesApi();
        } catch(err) {
            console.log(err)
        }
    
}

    const getPublicFeed = (item) => {
        return (   <> 
                        <p><i>On {getDateFormatted(item.timestamp)}</i> <span className="name">{item.owner.name}</span> made a {item.feedType} entry</p>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>{item.feedType}</p>
                        <p className="close" onClick={() => deleteFeeds(item._id)}><FiX></FiX></p>
                        <div className="imgWrap">
                    

{ item.pics && <div>
                    <SimpleImageSlider
                      width="100%"
                      height={300}
                      images={item.pics}
                      showBullets={true}
                      showNavs={true}
                    />
                  </div> }
                        </div>
                       
                        <Comments data={item.comments} item={item} postComment={postComment} deleteComment={deleteComment} />
                       

                    </>
        )
    }

    const getMyFeed = (item) => {
        return (   
         
        <> 
    
        <section className="introduction ">
        <div className="container">

           
       
            <p><i>On {getDateFormatted(item.timestamp)}</i> you made a {item.feedType} entry </p>
            {/* <h3 className="display-6">{item.title} </h3> */}
            <div className="Posts">
            <p className="fs-3 fw-light text-muted">{item.title}</p>
           <div className="imageSlider" >
            <div className="swiper" >
                    { item.pics && <div>
                    <SimpleImageSlider
                      width="100%"
                      height={300}
                      images={item.pics}
                      showBullets={true}
                      showNavs={true}
                    />
                  </div> }
                    
            </div>
           </div>
           
          
            <div>
               <section>
               <p className="lead mt-2">{item.description}</p>
               </section>
                
            </div>
           </div>
            <p className="close" onClick={() => deleteFeeds(item._id)}><FiX></FiX></p>
            {/* <div className="imgWrap">
                {item.pics && item.pics.map((pic, index) => (
                    <div key={index} className="imgDisplay"><img src={pic.url} /></div>
                ))}
            </div> */}
            </div>
            </section>

            
           

                <Comments data={item.comments} item={item} postComment={postComment} deleteComment={deleteComment} />
        </>
)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        getMemoriesApi();

       
    }

    const handleSearchInputChange = (e) => {
        setSearchString(e.target.value);
    }

    return (
        <>

        <MemoryMenu page={publicFeeds ?pages.PUBLIC_FEEDS : pages.MY_FEEDS} />

            <br /><br />

            <div className="searchWrap">
                <form onSubmit={handleSearch} className="searchForm">
                    <input type="text" id="searchValue" value={searchString} onChange={handleSearchInputChange}  />
                    <input value="search" type="submit" />
                </form>
                
            </div> 

            <div className="memoriesContainer ">
                { memories && memories.map( (item, index) =>  (
                     <div className="memories " key={index}>
                        { publicFeeds ? getPublicFeed(item) : getMyFeed(item)} 
                    </div>
                ))}
                { loading ?  <img className="loaderIcon" src="../images/imgLoader.gif"  width="50" height="30" />: <></>}
                { isInit && (memories &&  memories.length === 0) ? <h4>No Memories Found</h4> : <></>}
            </div>


           
            <Footer />

        </>
    )

   
};



export default Landing;




