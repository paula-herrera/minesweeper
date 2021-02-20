import React, { useState, useEffect} from 'react';

let timeIntervalId;

const Timer = ({gameOver, sendTime}) => {
  let [time, setTime] = useState(0);

  useEffect(() => {
    function incrementTime() {
      setTimeout(() => {
        let newTime = time + 1;
        setTime(newTime);
      }, 1000);
    }
    incrementTime();
  }, [time]);

  return (
    <div style={{color: "black", fontSize: 20}}>
      <span role="img" aria-label="clock" style={{paddingRight: 10}}>
        ⏱ {time}
      </span>
    </div>
  )
}

export default Timer;