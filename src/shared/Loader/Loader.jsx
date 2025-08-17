import React from "react";

const Loader = ({ text = "Loading...", size = 50, color = "#4F46E5" }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `${size / 8}px solid #f3f3f3`,
    borderTop: `${size / 8}px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={styles.container}>
      <div style={spinnerStyle}></div>
      <span style={styles.text}>{text}</span>

      {/* Inline keyframes for spin animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "20px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    fontWeight: "500",
  },
};

export default Loader;
