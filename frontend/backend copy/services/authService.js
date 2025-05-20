import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyeFea-GyKwhyK1LWtLNpoo84Aj0RZ4V0",
  authDomain: "record-9587f.firebaseapp.com",
  projectId: "record-9587f",
  storageBucket: "record-9587f.firebasestorage.app",
  messagingSenderId: "1070266167737",
  appId: "1:1070266167737:web:a42c8162425794c818c668",
  measurementId: "G-TWG9P67NR1",
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch {
  app = initializeApp(firebaseConfig, "default");
}

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const validatePassword = (password) => {
  return (
    password.length >= 6 &&
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)
  );
};

export const signInWithGoogle = async (role = "user") => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      // Create new user profile
      await setDoc(doc(db, "users", user.uid), {
        fullName: user.displayName,
        email: user.email,
        role,
        createdAt: new Date().toISOString(),
      });
    }

    const userData = userDoc.exists() ? userDoc.data() : { role };

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName,
        role: userData.role,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signUp = async (email, password, fullName, role = "user") => {
  if (!validatePassword(password)) {
    throw new Error(
      "Password must be at least 6 characters and contain both letters and numbers"
    );
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      role,
      createdAt: new Date().toISOString(),
    });

    // Send verification email
    await sendEmailVerification(user);

    return {
      success: true,
      message: "Account created! Please check your email for verification.",
      user: {
        uid: user.uid,
        email: user.email,
        fullName,
        role,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signIn = async (email, password, role = "user") => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    if (userData.role !== role) {
      throw new Error(`Invalid credentials for ${role} login`);
    }

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        fullName: userData.fullName,
        role: userData.role,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "Password reset email sent successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const saveUserData = async (userId, data) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, data);
};

export const getUserData = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() : null;
};
