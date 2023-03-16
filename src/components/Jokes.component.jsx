import { useState, useEffect } from "react";
import spinner from "../assets/spinner1.jpg";

const Jokes = () => {
  const [joke, setJoke] = useState({});
  const [isloading, setIsLoading] = useState();

  const url = "https://api.chucknorris.io/jokes/random";

  /*
  - A függvényben hajtom végre a fetch-elést amely végén a data-t a setJoke-al belerakom a useState-be
  - Az isLoading értékét true-ra állítom, hogy a fetch-elés alatt a spinner forogjon
  */

  const getJoke = () => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setJoke(data);
        setIsLoading(false);
      });
  };

  /*useEffect nélkül csak sima kártyát látnánk, mert az oldal töltésekor nem fut le a függvény.
  
  Mivel useEffect-be van rakva a függvényhívás és üres tömb meg van adva, így az oldal töltésekor egyszer lefut a useEffect és a függvényhívás.
  */
  useEffect(() => {
    getJoke();
  }, []);

  return (
    <section className="--flex-center --100vh --bg-primary">
      <div className="container --card --bg-light --p">
        <h2>Random Jokes Generator</h2>
        <div className="--line"></div>

        {/* ha isLoading true akkor a spinner jelenik meg ha nem akkor a vicc az url-el */}
        {isloading ? (
          <div className="--center-all">
            <img src={spinner} alt="spinner" width={100} />
          </div>
        ) : (
          <>
            <h4>Joke: {joke.value}</h4>
            <p>Link: {joke.url}</p>
          </>
        )}
        <br />
        <button className="--btn --btn-primary" onClick={getJoke}>
          Add a new Joke
        </button>
      </div>
    </section>
  );
};

export default Jokes;
