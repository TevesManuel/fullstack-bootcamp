# My notes
## Objetive
This file is for personal use and public use for anyone who reads it, it has points that it is useful for me in particular to leave written down in some accessible place while I do the bootcamp.

## Command line notes
### How to create a project with Vite + React:
```
npm create vite@latest {NAMEOFTHEPROJECT} -- --template react
```

### For Dev dependencies
```
npm i --save-dev PACKAGE_NAME
```

### Check & update dependencies
```
npm install -g npm-check-updates
npm-check-updates
ncu -u
npm audit
```

## Javascript Features
### Ternary operator
``` javascript
const result = condition ? val1 : val2
```
Explanation: result is where val1 or val2 will be deposited, which val will be deposited in result depends on condition, if condition is true result=val1, otherwise result=val2.

### The property fields and the variable names in the object are the same
``` javascript
const person = { name: name, age: age } === const person = { name, age }
```

### Spread
#### Spread syntaxis:
```javascript
const numbers = [1, 2, 3];
const new_numbers = [...numbers, 4, 5];
console.log(new_numbers); // Print "[1, 2, 3, 4, 5]"
    
const numbers = [1, 2, 3];
const new_numbers = [numbers, 4, 5];
console.log(new_numbers); // Print "[[1, 2, 3], 4, 5]"
```

#### Spread in elements

``` Javascript
<Greeting firstName='Arto' lastName='Hellas' />

const person = {
  firstName: 'Arto',
  lastName: 'Hellas'
}

<Greeting {...person} />
```

#### Spread in the objects
``` Javascript
> a
{ a: 2, b: 5 }
> b
{ b: 7, c: 8 }
> {...a, ...b}
{ a: 2, b: 7, c: 8 }
```

## Vite configurations
### Proxy Vite for develop Front & Back
-Add to vite.config.js:
``` javascript
export default defineConfig({
plugins: [react()],
server: {
    proxy: {
    ' {URLTOACCESS} ': {
        target: ' {URLTOREDIRECT} ',
        changeOrigin: true,
    },
    }
},
})
```
## DataBases
### Free online Mongo DB
    MongoDB Atlas Database : https://www.mongodb.com/es/atlas/database

## Configurations of the DB
### All IPs
    0.0.0.0

## How i use a databaase?
### Connect to the database & close in crashing
``` Javascript
const mongoose = require('mongoose');
const logger   = require('./logger');
const config   = require('./config');
const db_url   = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster0.ythuy5f.mongodb.net/${config.DB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

const setup_db = () => {
    mongoose.set('strictQuery', false);
    process.on('exit', () => turn_off());
    // console.log('Connecting to', db_url);
    return mongoose.connect(db_url).then((result) => result ? logger.info('[i] DB connected.') : logger.info('[!] Can\'t connect to the DB.'));
};

const turn_off = () => {
    logger.info('[i] DB disconnected.');
    mongoose.connection.close();
};

module.exports.setup_db = setup_db;
module.exports.turn_off = turn_off;
```
### Schemes
``` Javascript
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: String,
    url: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: Number
});

module.exports = mongoose.model('Blog', blogSchema); //Generate the model
```
### Models / Controller
Exampe https://github.com/TevesManuel/fullstack-bootcamp/blob/main/part4/BlogList-4.1-4.23/src/controllers/Blog.js
#### Populate method
The populate('blogs') function tells Mongoose to search the collection of related blogs and replace the blogs in the field.

## Routers on expressJS
### How configurate?
``` Javascript
app.use('/api/login', loginRouter);
```
``` Javascript
const loginRouter = require('express').Router();
loginRouter.post('/', async (request, response) => {...};
loginRouter.get('/users', async (request, response) => {...};
//...
module.exports = loginRouter;
```
### Remove try/catch for middlewares
That's possible with the express-async-errors library which automatically execute "next" function when there is an error
``` Javascript
// in the app file
require('express-async-errors');
```

## Documentation of libraries
### Documentation for react-toastify
https://deadsimplechat.com/blog/react-toastify-the-complete-guide/

## Testing

### For testing in frontend you need run this commands:
``` bash
npm install --save-dev vitest jsdom
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev eslint-plugin-vitest-globals
npm install --save-dev @testing-library/user-event
```
-Config the .eslintrc.cjs:
    Add to env:
    ``` bash
    "vitest-globals/env": true
    ```
-Add to extends:
    ``` bash
    'plugin:vitest-globals/recommended',
    ```    
-And finally for run tests:
    ``` bash
    npm test -- --coverage / bun vitest
    ```
-Create and add content to vitest.config.ts:
``` javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
test: {
    globals: true,
    environment: 'jsdom',
},
plugins: [react({
    jsxRuntime: 'automatic'
})],
});
```

## Reducers:    
### It is a pure function that receives the current state and an action object. If there is a state change, the old object does not change, but is replaced by a new object.
#### More info in:
- https://redux.js.org/tutorials/essentials/part-1-overview-concepts#reducers
- https://es.wikipedia.org/wiki/Programaci%C3%B3n_funcional#Funciones_puras
### React Query & React Redux
- React Query is a server state library, responsible for managing asynchronous operations between the server and client
- Redux, etc. are client state libraries that can be used to store asynchronous data, although less efficiently when compared to a tool like React Query

## React Query
### First configure the main file
``` Javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>,
);
```
I add QueryClient and QueryClientProvider, initialize queryClient and enclose <App /> inside QueryClientProvider with client=queryClient initialized above 
### Ok, later in the file you need a server status
``` Javascript
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import anyService from './../../services/anyservice';

const queryClient =  useQueryClient();
const Component () => {
    const updateAny = () => {
        queryClient.invalidateQueries(['any']);
    };//invalidate

    const result = useQuery({
        queryKey: ['any'],
        queryFn: anyService.getAll
    });//Only once unless invalidated

    if(result.isLoading)
    {
        return (
            <div>
                <h1>Loading any...</h1>
            </div>
        );
    }
    if(result.isError)
    {
        return (
            <div>
                <h1>Any service not avaible due to problem in server.</h1>
            </div>
        );
    }
    return (
      <div>
        <ul>
          {result.data.map((any) => (
                    <li>{any}<li/>
                ))}
        </ul>
      </div>
    );
}
```
The good thing about this is that you can call the query and modify it from anywhere in the code without passing anything as an argument, just importing useQueryClient
### For example for update an item
``` Javascript
onSuccess: (newAnecdote) => {
  const anecdotes = queryClient.getQueryData(['anecdotes']);
  queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote));
}
```
### For example for create an item
``` Javascript
onSuccess: (newAnecdote) => {
  const anecdotes = queryClient.getQueryData(['anecdotes']);
  queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
}
```
## React Context
### First create the ./context/any
``` Javascript
import { createContext, useReducer } from 'react';

const anyReducer = (state, action) => {
    switch (action.type) {
        case 'ANY_NAME_FOR_THE_ACTION':
            return any_value;//any value is the new state, because is a reducer function
        default:
            return state;
    }
};

const AnyContext = createContext();

export const AnyContextProvider = (props) => {
    const [any, anyDispatch] = useReducer(anyReducer, null);

    return (
        <AnyContext.Provider value={[any, anyDispatch]}>
            {props.children}
        </AnyContext.Provider>
    );
};

import { useContext } from 'react';

export const useAnyValue = () => {
    const anyAndDispatch = useContext(AnyContext);
    return anyAndDispatch[0];
};
export const useAnyDispatch = () => {
    const anyAndDispatch = useContext(AnyContext);
    return anyAndDispatch[1];
};

export default AnyContext;
```
### Later configure the main file
``` Javascript
import { AnyContextProvider } from './context/any';

const App = () => {
    return (
        <div>
            <ToastContainer />
            <AnyContextProvider>
                <Navbar />
                <BlogList />
            </AnyContextProvider>
        </div>
    );
};

export default App;
``` 
### For use the value
``` Javascript
import { useAnyValue } from '../../../../context/user';
const any = useAnyValue();
console.log(any);
``` 
``` Javascript
import { useAnyDispatch } from '../../../../context/user';
const dispatch = useAnyDispatch();
dispatch({type: 'ANY_NAME_FOR_THE_ACTION', payload: {any: 'any'}});
```
This updates itself

## Personalized Hooks
``` Javascript
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
const App = () => {
  const name = useField('text')
  // ...

  return (
    <div>
      <form>
        <input
          type={name.type}
          value={name.value}
          onChange={name.onChange} 
        /> 
        // ...
      </form>
    </div>
  )
}
```

## Transpilers
- #### Babel
    Babel is a transpiler to convert new Javascript code into "old" Javascript code compatible with browsers, through presets that are collections of plugins (which are Babel extensions that modify the code in a specific way either for compatibility, optimization or another objective)
  In react use preset-react and for the new features of Javascript preset-dev

## Libraries
- ### Complex forms
https://react-hook-form.com/
- ### Graphics
https://recharts.org/en-US/
- ### Dates
https://github.com/date-fns/date-fns
- ### Security
https://helmetjs.github.io/
- ### The best linter
https://prettier.io/
