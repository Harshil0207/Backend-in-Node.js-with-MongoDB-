const firebaseApp = require("firebase/app");
const firebaseStorage = require("firebase/storage");
const multer = require("multer");

firebaseApp.initializeApp({
  apiKey: "AIzaSyDy7TAbJ9qtUqEO8fYgfnCDmcwAilJ54pU",
  authDomain: "project-6b391.firebaseapp.com",
  projectId: "project-6b391",
  storageBucket: "project-6b391.appspot.com",
  messagingSenderId: "1073181190794",
  appId: "1:1073181190794:web:d2b036e286d89b94fd9b73",
  measurementId: "G-MFM1LX0V5R"
});

const fileFilter = (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only image files are allowed."));
    }
}

const storage = firebaseStorage.getStorage();
const multerUpload = multer({ storage: multer.memoryStorage(),fileFilter:fileFilter});
 

const uploadFileToFirebase = async (file, userType, fileType) => {
  try {
    let destinationPath;
    const dateTime = new Date().getTime()

    if(userType == "admin" && fileType == "profile"){
      destinationPath = `admin/profile/${file.originalname}-${dateTime}`;
    } else if(userType == "user" && fileType == "profile"){
      destinationPath = `user/profile/${file.originalname}-${dateTime}`;
    } else if(userType == "student" && fileType == "profile"){
      destinationPath = `student/profile/${file.originalname}-${dateTime}`;
    } 
 

    const storageRef = firebaseStorage.ref(storage, destinationPath);
    const metadata = { contentType: file.mimetype };
 
    const snapshot = await firebaseStorage.uploadBytes(storageRef, file.buffer, metadata);
    const downloadURL = await firebaseStorage.getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading to Firebase Storage:", error);
    throw error;
  }
};


const deleteFileFromFirebase = async (filePath) => {
  try {
    const storageRef = firebaseStorage.ref(storage, filePath);

    if (!filePath || filePath === "/") {
      throw new Error("Invalid file path. Cannot delete from root.");
    }

    await firebaseStorage.deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file from Firebase Storage:", error);
    throw error;
  }
};



module.exports = { uploadFileToFirebase, deleteFileFromFirebase, multerUpload };
