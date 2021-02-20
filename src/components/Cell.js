import React from 'react';
import '../App.css';
import Poo from '../images/poo.png';
import Bone from '../images/bone.png';

export default function Cell({details, updateFlag, revealCell}) {
  const cellstyle = {
    background: details.revealed
      ? details.value === 'X'
        ? '#FFD896'
        : groundChexPattern(details.x, details.y)
      : grassPattern(details.x, details.y),
    color: numColorCode(details.value),
  }

  return (
    <div
      onClick={() => revealCell(details.x, details.y)}
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      style={cellstyle}
      className="cellStyle"
    >
      {!details.revealed && details.flagged ? <img src={Bone} alt="Poo"></img> : details.revealed && details.value !== 0 ? (details.value === 'X' ? <img src={Poo} alt="Poo"></img> : details.value) : ('')}
    </div>
  )
};

const groundChexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return '#FFD797';
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return '#F8CA95';
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return '#F8CA95';
  } else {
    return '#FFD797';
  }
};

const grassPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#aad751";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#a2d249";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#a2d249";
  } else {
    return "#aad751";
  }
};

const numColorCode = (num) => {
  if (num === 1) {
    return '#3186CD';
  } else if (num === 2) {
    return '#F25252';
  } else if (num === 3) {
    return '#F7A117';
  } else if (num === 4) {
    return '#aad751';
  } else if (num === 5) {
    return '#F25252';
  } else if (num === 6) {
    return '#2E3E51';
  } else {
    return "white";
  }
}