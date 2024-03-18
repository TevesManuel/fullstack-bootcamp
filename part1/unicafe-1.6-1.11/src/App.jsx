import { useState } from 'react'

const Display = ({name, content}) => {
  return (
    <div>
      <p>{name}: {content}</p>
    </div>
  );
};
const Button = ({callback, text}) => {
  return (
    <div>
      <button onClick={callback}>{text}</button>
    </div>
  );
};
const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad;
  return (
    <div>
      <Display name="all" content={all}/>
      <Display name="average" content={(good-bad)/all}/>
      <Display name="positive" content={good/all*100 + "%"}/>
    </div>
  );
}
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Display name="good" content={good}/>
      <Display name="neutral" content={neutral}/>
      <Display name="bad" content={bad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <Button callback={()=>{setGood(good + 1)}} text="good"/>
      <Button callback={()=>{setNeutral(neutral + 1)}} text="neutral"/>
      <Button callback={()=>{setBad(bad + 1)}} text="bad"/>
    </div>
  );
};

export default App;