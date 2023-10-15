import React, { useState } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */

function JokeList() {
  // const [numJokes, setNumJokes] = useState(5)
  let numJokes = 5
  const [jokes, setJokes] = useState([])
  const [seenJokes, setSeenjokes] = useState(new Set())
  

  /* retrieve jokes from API */

  async function generateNewJokes() {
      while(jokes.length < numJokes) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let {...joke } = res.data

        if(!seenJokes.has(joke.id)) {
          setSeenjokes(data => new Set([...data, joke.id]));

          setJokes(data => ({
            jokes: [...data],
            isLoading: false
          }));
        }else{
          console.log("duplicate found!")
        }
      }
    }
  
  
  // if (jokes.isLoading) {
  //   return (
  //     <div className="loading">
  //       <i className="fas fa-4x fa-spinner fa-spin" />
  //     </div>
  //   )
  // }

  /* change vote for this id by delta (+1 or -1) */
  function vote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  }

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
    
    

  return (
    <div className="JokeList">
      <button
        className="JokeList-getmore"
        onClick={generateNewJokes}
      >
        Get New Jokes
      </button>

      {sortedJokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
        />
      ))}
    </div>
    );
  }


export default JokeList;
