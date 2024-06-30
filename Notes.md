# This file is for personal use and public use for anyone who reads it, it has points that it is useful for me in particular to leave written down in some accessible place while I do the bootcamp.


### How to create a project with Vite + React:
```
npm create vite@latest {NAMEOFTHEPROJECT} -- --template react
```

### Ternary operator
``` javascript
const result = condition ? val1 : val2
```
Explanation: result is where val1 or val2 will be deposited, which val will be deposited in result depends on condition, if condition is true result=val1, otherwise result=val2.

### The property fields and the variable names in the object are the same
``` javascript
const person = { name: name, age: age } === const person = { name, age }
```

### Inverted commas ( ` )
    ` = ALT+96 [ASCII]

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

### Free online Mongo DB
    MongoDB Atlas Database : https://www.mongodb.com/es/atlas/database

### All IPs
    0.0.0.0

### For Dev dependencies
    npm i --save-dev PACKAGE_NAME

### Remove try/catch for routers
    That's possible with the express-async-errors library which automatically execute "next" function when there is an error

### Documentation for react-toastify
    https://deadsimplechat.com/blog/react-toastify-the-complete-guide/

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
    Add to extends:
    ``` bash
    'plugin:vitest-globals/recommended',
    ```    
And finally for run tests:
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
### Reducers:
    
# It is a pure function that receives the current state and an action object. If there is a state change, the old object does not change, but is replaced by a new object.

# More info in:

-https://redux.js.org/tutorials/essentials/part-1-overview-concepts#reducers
-https://es.wikipedia.org/wiki/Programaci%C3%B3n_funcional#Funciones_puras

### Spread syntaxis:
```javascript
    const numbers = [1, 2, 3];
    const new_numbers = [...numbers, 4, 5];
    console.log(new_numbers); // Print "[1, 2, 3, 4, 5]"

    
    const numbers = [1, 2, 3];
    const new_numbers = [numbers, 4, 5];
    console.log(new_numbers); // Print "[[1, 2, 3], 4, 5]"
```

### React Query & React Redux
- React Query is a server state library, responsible for managing asynchronous operations between the server and client
- Redux, etc. are client state libraries that can be used to store asynchronous data, although less efficiently when compared to a tool like React Query