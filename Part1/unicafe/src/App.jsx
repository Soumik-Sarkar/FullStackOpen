import { useState } from "react";

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Button = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good / total) * 100;

  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine title={"good"} value={good} />
        <StatisticLine title={"neutral"} value={neutral} />
        <StatisticLine title={"bad"} value={bad} />
        <StatisticLine title={"all"} value={total} />
        <StatisticLine title={"average"} value={average} />
        <StatisticLine title={"positive"} value={positive} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ title, value }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header header="give feedback" />
      <Button title={"good"} onClick={handleGood} />
      <Button title={"neutral"} onClick={handleNeutral} />
      <Button title={"bad"} onClick={handleBad} />
      <Header header="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
