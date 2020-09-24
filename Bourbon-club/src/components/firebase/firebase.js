import firebaseConfig from "./config";

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  async getUserProfile({userId}) {
    return this.db.collection('publicProfiles').where('userId', '==', userId).get();
  }

  async register({email, password, username}) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    return this.db.collection('publicProfiles').doc(username).set({
      userId: newUser.user.uid
    })
  }

  async postComment({text, bourbonId}){
    const postCommentCallable = this.functions.httpsCallable('postComment');
    return postCommentCallable({
      text,
      bourbonId 
    });
  }

  subscribeToComments({bourbonId, onSnapshot}){
    const bourbonsRef = this.db.collection('bourbons').doc(bourbonId)
    return this.db.collection('comments')
    .where('bourbon', '==', bourbonsRef)
    .orderBy('dateCreated', 'desc')
    .onSnapshot(onSnapshot)
    }
  

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
