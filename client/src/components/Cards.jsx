import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { getCountries } from "../redux/actions";
import { Link } from "react-router-dom";
import style from "./cards.module.css";

function Cards() {
  let countriesState = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  });

  return (
    <div className={style.container}>
      {countriesState.length > 0 ? (
        countriesState.map((c) => (
          <Link key={c.id} to={`/countries`}>
            <Card
              key={c.id}
              name={c.name}
              capital={c.capital}
              flag={c.flag}
              continente={c.continente}
            />
          </Link>
        ))
      ) : (
        <h2>loading..</h2>
      )}
    </div>
  );
}

export default Cards;
