import "./style.css";
import {
  generalQuiz,
  cinemaQuiz,
  superHeroQuiz,
  musicQuiz,
  animeQuiz,
} from "./Data";
import { useEffect, useState } from "react";
import Category from "./components/Category";
import First from "./components/First";
import Second from "./components/Second";

const hash = {
  "General Quiz": generalQuiz,
  "Cinema Quiz": cinemaQuiz,
  "Superhero Quiz": superHeroQuiz,
  "Music Quiz": musicQuiz, 
  "Anime Quiz": animeQuiz
};

export default function App() {

  function clock(now: any) {
    let newNow:any = new Date();
    let inSeconds = (newNow - now) / 1000;
    let minutes = Math.floor(inSeconds / 60) % 60;
    let seconds = Math.floor(inSeconds) % 60;
    let milliseconds = String(inSeconds).split(".")[1];

    setSpeed(minutes + ":" + seconds + ":" + milliseconds);
  }

  function fisherYatesShuffle(array: (typeof hash)["General Quiz"]) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function Slicer(category: (typeof hash)["General Quiz"]) {
    let cat = fisherYatesShuffle(category);
    let rand = Math.floor(Math.random() * cat.length);
    let newCat = cat.slice(rand);
    if (newCat.length > 5) {
      newCat = cat.slice(rand, cat.length - (newCat.length - 5));
      return newCat;
    } else if (newCat.length < 5) {
      rand = rand - (5 - newCat.length);
      newCat = cat.slice(rand);
      return newCat;
    }
    return newCat;
  }

  const [category, setCategory] = useState<ReturnType<typeof Slicer>>(() =>
    Slicer(generalQuiz)
  );

  const [speed, setSpeed] = useState<string>("")
  const [timer, setTimer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [answer, setAnswer] = useState<string | undefined>("");
  const [first, setFirst] = useState(
    fisherYatesShuffle(category).map((secondMatch) => secondMatch.first)
  );
  const [second, setSecond] = useState(
    fisherYatesShuffle(category).map((secondMatch) => secondMatch.second)
  );
  const [score, setScore] = useState(0);

  const congratulations = (target: HTMLElement, type: string) => {
    setScore((prevScore) => prevScore + 2);
    if (type === "first") {
      setFirst(first.filter((firstMatch) => firstMatch !== target.innerText));
      const primes: HTMLElement[] = Array.from(
        document.querySelectorAll(".seconds")
      );
      const a = primes.find(
        (prime) => prime.style.backgroundColor === "orange"
      ) as HTMLElement;
      setSecond(second.filter((cap) => cap !== a.innerText));
    } else {
      setSecond(
        second.filter((categoryMember) => categoryMember !== target.innerText)
      );
      const secs: HTMLElement[] = Array.from(
        document.querySelectorAll(".firsts")
      );
      const b = secs.find(
        (sec) => sec.style.backgroundColor === "orange"
      ) as HTMLElement;
      setFirst(
        first.filter((categoryMember) => categoryMember !== b.innerText)
      );
    }
  };

  const checker = (place: string, type: string) => {
    const item = category.find(
      (element) => element[type as keyof typeof element] === place
    );
    if (item) {
      setAnswer(type === "first" ? item.second : item.first);
    }
  };

  const showWrong = (target: HTMLElement, type: string) => {
    setScore((prevScore) => prevScore - 1);
    target.style.backgroundColor = "red";
    if (type === "first") {
      const secs: HTMLElement[] = Array.from(
        document.querySelectorAll(".seconds")
      );
      const a = secs.find(
        (sec) => sec.style.backgroundColor === "orange"
      ) as HTMLElement;
      a.style.backgroundColor = "red";
    } else {
      const primes: HTMLElement[] = Array.from(
        document.querySelectorAll(".firsts")
      );
      const b = primes.find(
        (secs) => secs.style.backgroundColor === "orange"
      ) as HTMLElement;
      b.style.backgroundColor = "red";
    }
  };

  const clearColours = (state: string) => {
    const primes: HTMLElement[] = Array.from(
      document.querySelectorAll(".firsts")
    );
    const secs: HTMLElement[] = Array.from(
      document.querySelectorAll(".seconds")
    );
    if (state === "category") {
      primes.forEach((prime) => {
        prime.style.backgroundColor = "thistle";
      });
      secs.forEach((sec) => {
        sec.style.backgroundColor = "lightblue";
      });
    }
    if (state === "inactive") {
      primes.forEach((prime) => {
        if (prime.style.backgroundColor === "red")
          prime.style.backgroundColor = "thistle";
      });
      secs.forEach((sec) => {
        if (sec.style.backgroundColor === "red")
          sec.style.backgroundColor = "lightblue";
      });
    } else {
      primes.forEach((prime) => {
        if (prime.style.backgroundColor === "orange")
          prime.style.backgroundColor = "thistle";
      });
      secs.forEach((sec) => {
        if (sec.style.backgroundColor === "orange")
          sec.style.backgroundColor = "lightblue";
      });
    }
  };

  const firstClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!timer) setTimer(true);
    if (isActive) {
      if (!first.includes(answer as string)) {
        clearColours("category");
        target.style.backgroundColor = "orange";
        checker(target.innerText, "first");
        return;
      }
      if (target.innerText === answer) {
        congratulations(target, "first");
        clearColours("active");
        setIsActive(false);
        setAnswer("");
      } else {
        showWrong(target, "first");
        setIsActive(false);
        setAnswer("");
      }
      return;
    } else {
      clearColours("inactive");
      target.style.background = "orange";
      setIsActive(true);
    }
    checker(target.innerText, "first");
  };

  const secondClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!timer) setTimer(true);
    if (isActive) {
      if (!second.includes(answer as string)) {
        clearColours("category");
        target.style.backgroundColor = "orange";
        checker(target.innerText, "second");
        return;
      }
      if (target.innerText === answer) {
        congratulations(target, "second");
        clearColours("active");
        setAnswer("");
        setIsActive(false);
      } else {
        showWrong(target, "second");
        setIsActive(false);
        setAnswer("");
      }
      return;
    } else {
      clearColours("inactive");
      target.style.background = "orange";
      setIsActive(true);
    }
    checker(target.innerText, "second");
  };

  const changeCategory = (selectedCategory: string) => {
    const selected = Slicer(hash[selectedCategory as keyof typeof hash]);
    setCategory(selected);
    setFirst(
      fisherYatesShuffle(selected).map((secondMatch) => secondMatch.first)
    );
    setSecond(
      fisherYatesShuffle(selected).map((secondMatch) => secondMatch.second)
    );
    setScore(0);
    setTimer(false);
    clearColours("category");
  };

  useEffect(() => {
    let intervalId: any;

    if (timer) {
      const startTime = new Date();
      intervalId = setInterval(() => clock(startTime), 10);
    } else if (!timer && intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timer]);

  useEffect(() => {
    if (first.length == 0) setTimer(false);
  }, [first.length]);

  return (
    <div className="app">
      <Category changeCategory={changeCategory} />
      {first.length != 0 ? (
        <div className="container">
          <h2 className="score ">Score: {score}</h2>
          <div className="matches">
            <First first={first} firstClick={firstClick} />
            <Second second={second} secondClick={secondClick} />
          </div>
        </div>
      ) : (
        <div className="result">
          <h2>Your score is {score}</h2>
          <h2>You completed in time {speed}</h2>
        </div>
      )}
    </div>
  );
}
