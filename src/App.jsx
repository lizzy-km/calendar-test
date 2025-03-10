import { useState, useEffect } from "react";
import "./App.css";
import { requestForToken } from "./firebase/firebase";



function App() {
  const [token, setToken] = useState("");

 

  useEffect(() => {
    const getToken = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await requestForToken();
        if (token) {
          setToken(token);

         
        }
      }
    };

    getToken();
  }, []);

  // Example using Firebase Admin SDK (Node.js)

  return (
    <div className="App">
      <h1>Push Notification with React & FCM</h1>
      <p>
        Device Token 👉 <span style={{ fontSize: "11px" }}> {token} </span>
      </p>
      {token && <h2>Notification permission enabled 👍🏻</h2>}
      {!token && <h2>Need notification permission ❗️ </h2>}
    </div>
  );
}

export default App;
