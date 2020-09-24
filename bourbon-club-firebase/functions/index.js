const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.postComment = functions.https.onCall(async (data, context) => {
    checkAuthentication(context);
    dataValidator(data, {
        bourbonId: 'string',
        text: 'string'
    })
    const db = admin.firestore();
    const snapshot = await db
    .collection('publicProfiles')
    .where('userId', '==', context.auth.uid)
    .limit(1)
    .get();
    
    await db.collection('comments').add({
            text: data.text,
            username: snapshot.docs[0].id,
            dateCreated: new Date(),
            bourbon: db.collection('bourbons').doc(data.bourbonId)
        });
    });

    function dataValidator(data, validKeys) {
        if(Object.keys(data).length !== Object.keys(validKeys).length){
            throw new functions.https.HttpsError('invalid-argument', 'Du må kun skrive almindelige tal og bogstaver')
        }else{
            for(let key in data){
                if(!validKeys[keys] || typeof data[key] !== validKeys[key]){
                    throw new functions.https.HttpsError('invalid-argument', 'Du må kun skrive almindelige tal og bogstaver')
                }
            }
        }
    }

    function checkAuthentication(context) {
        if(!context.auth){
            throw new functions.https.HttpsError('unauthenticated', 'Du skal være logget ind for at kunne kommentere');
        }
    }
