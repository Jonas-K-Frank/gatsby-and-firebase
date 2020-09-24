import React, {useEffect, useState} from "react"
import styled from 'styled-components'
import {Button} from './Button';
import {Input} from './Input';
import moment from 'moment';
import 'moment/locale/da';

console.log(moment.locale());

const CommentForm = styled.form`
    display: flex;
    margin-top: 32px;

    ${Input}{
        margin-right: 8px;
        margin-top: auto;
        margin-bottom: auto;
    }

    ${Button}{
        margin: auto 0;
    }
`;

const CommentListItem = styled.div`
    border-bottom: 1px solid #ddd;
    padding: 4px 0;

    >strong{
        font-size: 80%;
        color: #666;
    }
`;


export const Comments = ({firebase, bourbonId}) => {

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    


    useEffect(() => {
     const unsubscribe = firebase.subscribeToComments({
          bourbonId,
          onSnapshot: (snapshot) => {
           
            const snapshotComments = [];
            snapshot.forEach(doc => {
              snapshotComments.push({
                id: doc.id,
                ...doc.data()
                })
            })
            setComments(snapshotComments);
          }
        })

        return () => {
            if(unsubscribe)
                unsubscribe();
        }

    }, [])    

    function handlePostCommentSubmit(e) {
        e.preventDefault();
        firebase.postComment({
            text: commentText,
            bourbonId 
        })
    }

    return(
        <div>
            <CommentForm onSubmit={handlePostCommentSubmit}>
                <Input value={commentText} onChange={e => {
                    e.persist();
                    setCommentText(e.target.value);
                }}/>
                <Button type='submit'>
                    Del din mening
                </Button>
            </CommentForm>
            {comments.map(comments => (
                <CommentListItem key={comments.id}>
                    <strong>
                        {comments.username} - {moment(comments.dateCreated.toDate()).format('lll')}
                    </strong>
                    <div>
                        {comments.text}
                    </div>
                    
                </CommentListItem>
            ))}
        </div>
    ) 
    

};