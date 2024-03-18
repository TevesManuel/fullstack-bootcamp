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
  return (
    <div>
        <p>Number of exercises {params.parts.reduce((acc, current) => acc+current.exercises, 0)}</p>
    </div>
  );
}
const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  );
};
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
      <Course course={course}/>
    </div>
  );
};

export default App;