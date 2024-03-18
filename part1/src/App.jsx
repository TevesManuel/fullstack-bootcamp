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
      <Part part={params.part1}/>
      <Part part={params.part2}/>
      <Part part={params.part3}/>
    </div>
  );
};
const Total = (params) => {
  return (
    <div>
        <p>Number of exercises {params.part1.exercises + params.part2.exercises + params.part3.exercises}</p>
    </div>
  );
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14
  };

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total part1={part1} part2={part2} part3={part3}/>
    </div>
  );
};

export default App