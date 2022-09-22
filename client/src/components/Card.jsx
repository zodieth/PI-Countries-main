import React from "react";
import style from "./card.module.css";

function Card(props) {
  return (
    <div className={style.container}>
      <h1>NAME: {props.name}</h1>
      <img className={style.flag} src={props.flag} alt="flag" />
      <h1>CAPITAL: {props.capital}</h1>
      <h1>CONTINENT: {props.continente}</h1>
    </div>
  );
}

export default Card;
