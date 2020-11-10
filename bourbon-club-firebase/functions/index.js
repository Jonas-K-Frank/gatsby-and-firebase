const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createBourbon = functions.https.onCall(async(data, context) =>{
    checkAuthentication(context, true);

    dataValidator(data, {
        bourbonName: 'string'
    })

    const bourbon = await admin.firestore().collection('bourbons')
    .where('name', '==', data.navn)
    .limit(1).get();

    if(!bourbon.empty){
        throw new functions.https.HttpsError('already-exists', 'Den bourbon eksistere allerede')
    }

    return admin.firestore().collection('bourbons').add({
        name: data.navn
    })
})

exports.createPublicProfile = functions.https.onCall(async (data, context) => {
    checkAuthentication(context);
    dataValidator(data, {
      username: 'string'
    });

    const userProfile = await admin
    .firestore()
    .collection('publicProfiles')
    .where('userId', '==', context.auth.uid)
    .limit(1)
    .get();
    
    if(!userProfile.empty){
        throw new functions.https.HttpsError('already-exists', 'Du har allerede en profil')
    }

    const publicProfile = await admin.firestore().collection('publicProfiles').doc(data.username).get()
        if(publicProfile.exists){
            throw new functions.https.HttpsError('already-exists', 'Dette brugernavn er desværre taget')
        }

        const user = await admin.auth().getUser(context.auth.uid);
        if (user.email === functions.config().accounts.admin) {
            await admin.auth().setCustomUserClaims(context.auth.uid, {admin: true});
        }

    return admin.firestore().collection('publicProfiles').doc(data.username).set({
        userId: context.auth.uid
          })
});

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
                if(!validKeys[key] || typeof data[key] !== validKeys[key]){
                    throw new functions.https.HttpsError('invalid-argument', 'Du må kun skrive almindelige tal og bogstaver')
                }
            }
        }
    }

    function checkAuthentication(context, admin) {
        if(!context.auth){
            throw new functions.https.HttpsError('unauthenticated', 'Du skal være logget ind for at kunne kommentere');
        }else if(!context.auth.token.admin && admin){
            throw new functions.https.HttpsError('permission-denied', 'Du skal være administrator for at kunne oprette nye bourbons');
        }
    }
