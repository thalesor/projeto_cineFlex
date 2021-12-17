import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./Snackbar.css";

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 4000);
    },
  }));
  
  const classesNames = "snackbar"; 
  return (
    
    <div
      className={classesNames}
      id={showSnackbar ? "show" : "hide"}
      
    >
      <h2>
        Erro:
      </h2>
      <div className="message">{props.message}</div>
    </div>
  );
});

export default Snackbar;
