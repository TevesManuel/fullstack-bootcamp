const Header = (params) => {
  return (
    <div>
      <h1>{params.course}</h1>
    </div>
  );
};
const Part = (params) => {
  return (
    <div>
      <p>
        {params.part.name} {params.part.exercises}
      </p>
    </div>
  );
};
const Content = (params) => {
  return (
    <div>
      //https://reactjs.org/link/warning-keys
      {params.parts.map(p => <Part key={self.crypto.randomUUID()} part={p}/>)}
    </div>
  );
};
const Total = (params) => {
  let sum = 0;
  params.parts.forEach(p => sum+=p.exercises);
  return (
    <div>
        <p>Number of exercises {sum}</p>
    </div>
  );
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  );
};

export default App;