import React, {useEffect, useState} from "react"
import styled from 'styled-components'
import {Button} from './Button'
import {Input} from './Input'

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

    return(
        <div>
            <CommentForm>
                <Input />
                <Button>
                    Del din mening
                </Button>
            </CommentForm>
            {comments.map(comments => (
                <CommentListItem key={comments.id}>
                    <strong>
                        {comments.username}
                    </strong>
                    <div>
                        {comments.text}
                    </div>
                    
                </CommentListItem>
            ))}
        </div>
    ) 
    

};