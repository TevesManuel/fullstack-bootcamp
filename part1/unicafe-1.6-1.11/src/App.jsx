import { useState } from 'react'

const Display = ({content}) => {
  return (
    <div>
      <p>{content}</p>
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
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Display content={good}/>
      <Display content={neutral}/>
      <Display content={bad}/>
      <Button callback={()=>{setGood(good + 1)}} text="good"/>
      <Button callback={()=>{setNeutral(neutral + 1)}} text="neutral"/>
      <Button callback={()=>{setBad(bad + 1)}} text="bad"/>
    </div>
  );
};

export default App;