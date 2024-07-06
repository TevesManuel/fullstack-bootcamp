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

### Spread in the objects
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
### Personalized Hooks
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
      
