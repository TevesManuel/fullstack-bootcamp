import { useState } from 'react'

const StatisticLine = ({name, content}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{content}</td>
    </tr>
  );
};
const Button = ({callback, text}) => {
  return (
      <button onClick={callback}>{text}</button>
  );
};
const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad;
  if ( all == 0)
  {
    return (
    <div>
      <h3>No feedback given.</h3>
    </div>
    );
  }
  return (
    <table>

      <tbody>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
        <StatisticLine name="good" content={good}/>
        <StatisticLine name="neutral" content={neutral}/>
        <StatisticLine name="bad" content={bad}/>
        <StatisticLine name="all" content={all}/>
        <StatisticLine name="average" content={(good-bad)/all}/>
        <StatisticLine name="positive" content={good/all*100 + "%"}/>
      </tbody>
    </table>
  );
}
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button callback={()=>{setGood(good + 1)}} text="good"/>
      <Button callback={()=>{setNeutral(neutral + 1)}} text="neutral"/>
      <Button callback={()=>{setBad(bad + 1)}} text="bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
};

export default App;