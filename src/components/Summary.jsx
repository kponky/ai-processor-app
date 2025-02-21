// components/Summary.js
import React from "react";

function Summary({ description }) {
  return (
    <div className="summary">
      <h3>Summary</h3>
      <p>{description}</p>
    </div>
  );
}

export default Summary;