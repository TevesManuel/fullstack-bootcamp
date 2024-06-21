This file is for personal use and public use for anyone who reads it, it has points that it is useful for me in particular to leave written down in some accessible place while I do the bootcamp.


-How to create a project with Vite + React:

    npm create vite@latest {NAMEOFTHEPROJECT} -- --template react

-Ternary operator
    
    const result = condition ? val1 : val2

    Explanation: result is where val1 or val2 will be deposited, which val will be deposited in result depends on condition, if condition is true result=val1, otherwise result=val2.

-The property fields and the variable names in the object are the same
    const person = { name: name, age: age } === const person = { name, age }

-Inverted commas ( ` )
    ` = ALT+96 [ASCII]

-Proxy Vite for develop Front & Back
    Add to vite.config.js:
    
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

-Free online Mongo DB
    MongoDB Atlas Database : https://www.mongodb.com/es/atlas/database

-All IPs
    0.0.0.0

-For Dev dependencies
    npm i --save-dev PACKAGE_NAME

-Remove try/catch for routers
    That's possible with the express-async-errors library which automatically execute "next" function when there is an error

-Documentation for react-toastify
    https://deadsimplechat.com/blog/react-toastify-the-complete-guide/

-For testing in frontend you need:
    Run this commands:
        npm install --save-dev vitest jsdom
        npm install --save-dev @testing-library/react @testing-library/jest-dom
        npm install --save-dev eslint-plugin-vitest-globals
        npm install --save-dev @testing-library/user-event
    Config the .eslintrc.cjs:
        Add to env:
            "vitest-globals/env": true
        Add to extends:
            'plugin:vitest-globals/recommended',
    And finally for run tests:
        npm test -- --coverage / bun vitest
        
    Create and add content to vitest.config.ts:
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
