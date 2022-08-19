import React, { useState } from "react";
import { getTimeSince } from "../../utils/dateFn";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import{AiOutlineDelete} from "react-icons/ai";
import { useGlobalContext } from "../Modal/context";
import{imageview} from "../Modal/imageview"



const Comments = ( {data, item, postComment, deleteComment}) => {
    
     console.log(item);
    const [comment, setComment] = useState();
    const [ curCommentId, setCurCommentId] = useState(null);
    const [ isComment, setIsComment] = useState(false);
 
   


    const[count,setCount]=useState(0)
   

    const updateComment = (e) => {
        setComment(e.target.value)
    }

    const onPostCommentClick = (itemId) => {
        postComment(item._id, comment);
        setComment("");
    }

     const incrementMe=(data)=>{
        setCurCommentId(data);
        setIsComment(true);
    }
  

    return (
        <>

                { data && data.length && isComment ? 
                <section className="introduction">
                    <div className="container mt-5"> 
                    
                    <div className="commentsWrap">
                      
                            <p >Comments</p>
                            <p className=""></p>
                            {item.comments.map( (comment, index) => (
                                <div className="commentItem">
                                    <p>
                                        <span className="time">{getTimeSince(comment.createdAt)} </span> 
                                        <span  className="user">{comment.commenter.name}</span>
                                    </p> 
                                    <div className="d-flex justify-content-between ">
                                    <p className="comment">{comment.comment}</p>
                                        <p><a onClick={() => deleteComment(item._id, comment._id)}><AiOutlineDelete/></a></p>
                                    </div>
                                       
                                </div>
                            ) )}
                    </div>
                    </div> 
                    </section> : <></>
                }   
                
               
              
                { curCommentId !== item._id ?   <button className="ml-5" onClick={() => incrementMe(item._id)}>Comments</button> : <></>  }
              
                
                { 
                    curCommentId === item._id ? 
                  
                    <div className="commentForm">
                         
                        <input className="postcmt" type="text" value={comment} onChange={updateComment} placeholder="Enter your comment" />
                        <button className="postbtn"  onClick={() => onPostCommentClick(item._id)}>post</button>
                    </div> : <></>
                }
        </>
    )
};

export default Comments;





