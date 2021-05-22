import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyDOLvI5q7Ws9q-d7Q4UjCGtPpZ3FMScapw",
    authDomain: "bethouayogi-1946.firebaseapp.com",
    databaseURL: "https://bethouayogi-1946-default-rtdb.firebaseio.com",
    projectId: "bethouayogi-1946",
    storageBucket: "bethouayogi-1946.appspot.com",
    messagingSenderId: "1048033740105",
    appId: "1:1048033740105:web:a9ea70ed4264848765c698",
    measurementId: "G-EFM4K038KP"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

export const sendCategoryToFirebaseStorage = (categoryName, data) => {

    console.log('sendCategoryToFirebaseStorage', categoryName, data);

    var jsonString = JSON.stringify(data);
    // create a Blob from the JSON-string
    console.log(jsonString);
    var blob = new Blob([jsonString], {type: "application/json"});
    // create a reference to the storage
    var storageRef = firebase.storage().ref();
    // Create a reference to the file you are about to create
    // the reference points to "/BUCKET_NAME/FILE_NAME.json"
    var fileRef = storageRef.child(`/categories/${categoryName}.json`)
    // upload you blob into the storage 

    fileRef.put(blob).then(function(snapshot) {
      console.log('Uploaded a blob!');
    });
};

export const sendCategoryToFirebaseDB = (categoryName, data) => {
    
    // Initialize Firebase
    let app = firebase.initializeApp(firebaseConfig);
    let db = firebase.firestore(app);
    // Add a new document in collection "cities"
    console.log("sendCategoryToFirebase", categoryName, data[0]);
    db.collection("categories").doc(categoryName).set({test: "worked"})
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};