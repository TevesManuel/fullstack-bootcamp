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
      {/* https://reactjs.org/link/warning-keys} */}
      {params.parts.map(p => <Part key={self.crypto.randomUUID()} part={p}/>)}
    </div>
  );
};
const Total = (params) => {
  return (
    <div>
        <h3>Number of exercises {params.parts.reduce((acc, current) => acc+current.exercises, 0)}</h3>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];


  return (
    <div>
      <ul>
      {courses.map(course => <li key={course.id}><Course course={course}/></li>)}
      </ul>
    </div>
  );
};

export default App;