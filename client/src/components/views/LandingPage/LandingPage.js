import axios from "axios";

import React, { useEffect } from "react";

function LandingPage() {
  const LogOut = () => {
    axios.get("/api/users/logout").then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>LandingPage</h2>

      <button onClick={LogOut}>Logout</button>
    </div>
  );
}

export default LandingPage;
