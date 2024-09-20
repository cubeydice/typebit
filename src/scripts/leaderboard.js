import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, query, orderBy, limit } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const enterScore = async (name, score) => {
  try {
    const docRef = await addDoc(collection(db, "scores"), {
      name: name,
      score: score
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getLeaderboard() {
  const scoresQuery = query(
      collection(db, "scores"),
      orderBy("score", "desc"),
      limit(10)
  );

  const querySnapshot = await getDocs(scoresQuery);

  const scoreList = document.getElementById("scoreList");
  scoreList.innerHTML = "";

  let i = 1;
  querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement("li");
      listItem.innerHTML = `
          <span>#${i}:</span>
          <span>${data.score || 0}</span>
      `;
      scoreList.appendChild(listItem);
      i++;
  });

  const lowestHighScore = querySnapshot.docs[9] ? querySnapshot.docs[9].data().score : querySnapshot.docs[i - 2].data().score;
  return lowestHighScore;
}