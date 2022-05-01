// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc, query, getDocs, Timestamp, orderBy, deleteDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);


// Add a new document with a generated id.
export const addQA = async (qa: questionAnswer) => {
    qa = {
        question: qa.question,
        answers: qa.answers,
        custom: true,
        createdAt: Timestamp.now()
    }

    const docRef = await addDoc(collection(db, "nc-dmv"), qa);
    console.log("Document written with ID: ", docRef.id);
}

export const getQA = async (): Promise<cardDeck> => {
    // const q = query(collection(db, "nc-dmv"), where("custom", "==", true));
    const q = query(
        collection(db, 'nc-dmv'),
        orderBy('custom', 'desc'),
        orderBy('createdAt', 'desc')
    );
    const deck: cardDeck = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const q = { ...doc.data(), id: doc.id };
        deck.push(q as questionAnswer);
    });

    return deck;
}

export const deleteQA = async (id: string) => {
    console.log({ id });
    await deleteDoc(doc(db, "nc-dmv", id));
}

export type questionAnswer = { question: string, answers: string[], custom?: boolean, createdAt?: Timestamp, id?: string };
export type cardDeck = questionAnswer[]