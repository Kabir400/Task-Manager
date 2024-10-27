import React from "react";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.message}>Task Not Found</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    color: "#555",
  },
  header: {
    fontSize: "72px",
    fontWeight: "bold",
    color: "#ff4040",
  },
  message: {
    fontSize: "24px",
  },
};

export default NotFound;
