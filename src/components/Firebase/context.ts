import React from "react";
import firebase, { Firebase } from "./firebase";

const FirebaseContext = React.createContext<Firebase>(firebase);

export default FirebaseContext;
