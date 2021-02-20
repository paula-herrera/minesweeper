import React, { useState, useEffect } from 'react';
import flag from '../images/finish-flag.png'

const Modal = ({reset}) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, []);

  return (
    <div
    className="modal"
      style={{
        opacity: render ? 1 : 0,
      }}
    >
      <div id="gameOver">
        <div>
          <img src={flag} alt='finish flag'></img>
        </div>
        <div>
        </div>
        <div onClick={() => reset()} className="tryAgain">
          Try Again
        </div>
      </div>
    </div>
  )
}

export default Modal;