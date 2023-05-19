import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB_2nuRs97aAv3IWbTnsp3spJwi5auJxXM",
  authDomain: "zcreative-73a6b.firebaseapp.com",
  projectId: "zcreative-73a6b",
  storageBucket: "zcreative-73a6b.appspot.com",
  messagingSenderId: "534728444736",
  appId: "1:534728444736:web:d7260ee83b1e6d7b8cc8a5",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//////////creating db collection///////

export const db = getFirestore();
export const storage = getStorage();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  // else if (userSnapshot.exists) {
  //   alert("this email is already exist");
  // }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};
export const onAuthStateChangeListiner = (callback) =>
  onAuthStateChanged(auth, callback);

//////////// ADD PRODUCT TO DB ///////////////
export const addProductItem = async (data) => {
  try {
    const res = await addDoc(collection(db, "products"), {
      ...data,
      timestamp: serverTimestamp(),
    });
    console.log("successfuly insertede");
  } catch (err) {
    console.log(err);
  }
};

//////////////////////...reading products...////////////////////////
export const GetItems = async (collectionName) => {
  let products = [];
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.log(error);
  }
  console.log(products);
  return products;
};

//////// DELETE items from fire store ///////////

export const DeletItem = async (itemId, collectionName) => {
  try {
    await deleteDoc(doc(db, collectionName, itemId));
  } catch (error) {
    console.log(error);
  }
};

//////////// UPDATE DOCUEMENT //////////
export const UpdateItem = async (itemId, collectionName, updatedata) => {
  try {
    await setDoc(doc(db, collectionName, itemId), updatedata);
  } catch (error) {
    console.log(error);
  }
};
