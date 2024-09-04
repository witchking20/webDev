// src/components/ProgressBar.js
import React, { useContext } from "react";
import { ProgressContext } from "../context/ProgressContext.jsx";
import { useNavigate } from "react-router-dom";
import "./components.css";

const ProgressBar = () => {
  const { progress, setProgress, totalSteps } = useContext(ProgressContext);
  const percentage = (progress / totalSteps) * 100;
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (progress < totalSteps) {
      setProgress(progress + 1);
      navigate(`/resume/Resume${progress + 1}`);
    }
  };

  const backButtonClick = () => {
    if (progress > 1) {
      setProgress(progress - 1);
      navigate(`/resume/Resume${progress - 1}`);
    }
  };

  return (
    <>
      <div className="progress-bar-container">
        <div className="progress" style={{ width: `${percentage}%` }} />
      </div>
      <div className="Page-btn">
        <button
          element
          class="Back"
          onClick={backButtonClick}
          hidden={progress === 1}
        >
          Back
        </button>
        <button
          element
          class="Next"
          onClick={handleButtonClick}
          hidden={progress === 5}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProgressBar;
