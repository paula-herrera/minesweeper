import React, { useState, useEffect } from 'react';
import flag from '../images/finish-flag.png'

const Modal = ({reset, won}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div id="gameOver">
          <div>
            <img src={flag} alt='finish flag'></img>
          </div>
          <div>
            {won ? <p>You won!</p> : <p>Game Over :(</p>}
          </div>
          <div onClick={() => reset()} className="tryAgain">
            Start Over
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;