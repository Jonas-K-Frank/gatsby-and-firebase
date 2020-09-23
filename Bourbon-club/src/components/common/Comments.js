import React, {useEffect} from "react"

export const Comments = ({firebase, bourbonId}) => {

  


    useEffect(() => {
     const unsubscribe = firebase.subscribeToComments({
          bourbonId
        })

        return () => {
            if(unsubscribe)
                unsubscribe();
        }

    }, [])

        return(
        <div>Test tekst</div>
    ) 
    
/*     return(
        <div>
            {comments.map(comments => (
                <div key={comments.id}>
                    <strong>
                        {comments.username}
                    </strong>
                    <div>
                        {comments.text}
                    </div>
                    
                </div>
            ))}
        </div>
    )  */
};