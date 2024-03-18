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
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState([]);

  return (
    <div>
      <Display name="good" content={good}/>
      <Display name="neutral" content={neutral}/>
      <Display name="bad" content={bad}/>
      <Display name="all" content={all.length}/>
      <Display name="average" content={(good-bad)/all.length}/>
      <Display name="positive" content={good/all.length*100 + "%"}/>
      <Button callback={()=>{setAll(all.concat("good"));setGood(good + 1)}} text="good"/>
      <Button callback={()=>{setAll(all.concat("neutral"));setNeutral(neutral + 1)}} text="neutral"/>
      <Button callback={()=>{setAll(all.concat("bad"));setBad(bad + 1)}} text="bad"/>
    </div>
  );
};

export default App;