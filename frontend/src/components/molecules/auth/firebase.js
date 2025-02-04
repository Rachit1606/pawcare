import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import axios from 'axios';  // Import axios

const firebaseConfig = {
  apiKey: "AIzaSyBavZEWd7mU0Q_ZuC8zBXUM-OcI1B1tN6k",
  authDomain: "pawcare-cd6a8.firebaseapp.com",
  projectId: "pawcare-cd6a8",
  storageBucket: "pawcare-cd6a8.appspot.com",
  messagingSenderId: "68159895036",
  appId: "1:68159895036:web:3a338454e17059671e2e79",
  measurementId: "G-PHHG01P2D7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      // let mobileNumber = prompt("Please enter your mobile number:");

        const userData = {
          email: user.email,
          username: user.displayName,
          password: "",
          address: "", 
          phoneNumber: "", //mobileNumber,
          dogName: "",
          dogBreed: "",
          dogAge: "",
          dogGender: "",
          dogHealthIssues: "",
          dogDietRestrictions: ""
        }
      
        // await addDoc(collection(db, "users"), {
        //   uid: user.uid,
        //   name: user.displayName,
        //   authProvider: "google",
        //   email: user.email,
        //   mobile: mobileNumber,
        // });
        // Save to MongoDB
        await axios.post('https://pawcarebackend.onrender.com/users/create', userData);
  } 

}
catch (err) {
  console.error(err);
  alert(err.message);
}
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password, mobile, address, dogName, dogBreed, dogAge, dogGender, dogHealthIssues, dogDietRestrictions) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userData = {
      email,
      username: name,
      password:password,
      address,
      phoneNumber: mobile,
      dogName,
      dogBreed,
      dogAge,
      dogGender,
      dogHealthIssues,
      dogDietRestrictions
    };
    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   name,
    //   authProvider: "local",
    //   email,
    //   mobile,
    // });
    // Save to MongoDB
    await axios.post('https://pawcarebackend.onrender.com/users/create', userData);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth)
    .then(() => {
      window.location.assign('/'); 
    })
    .catch((error) => {
      alert(`Logout error: ${error.message}`);
    });
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userData');
  localStorage.removeItem('cart');
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
