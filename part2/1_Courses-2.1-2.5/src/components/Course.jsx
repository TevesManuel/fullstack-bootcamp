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
};
const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    );
};

export default Course;