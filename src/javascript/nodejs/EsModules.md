# Nodejs ES Module Syntax

::: warning Introduction
If you are familiar with any of the javascript front end frameworks like angular, react or vue, you might be familiar with the es module import and export syntax. 
```js
import class from package
```
```js
export something
```
But if you compare it with node.js, it is still using the traditional common.js syntax for import and export. which is this,
```js
const something = require('something');
```
```js
module.exports = {
    somevariable: '***',
    somefn: () => {

    }
}
```

Now node.js community have come up (after node 10) with the latest esm syntax for node aswell, but it is still in the experimental stages, therefore you cannot use it for real development work (still you can use babel for now). but anyway it will be supported natively with comming releases, so learning about this is not so bad.
:::

::: danger Important
In order to use the esm syntax the file should be `.mjs` and not `.js`
:::


## Example (A dice package)

- Create a mjs file called `dice.mjs`

- Create a function call roll and export (simple as that)
  - Function is very simple, a function that return values from 1 - 6 randomly.]

```js
export const roll = () => {
    return Math.floor(Math.random() * 6) + 1 
}
```

- import the exported function in another file, I will name it as `main.mjs`, (it also needs to be a mjs file)
    - A package can return many functions and variables, therefore all the exported items will be inside an object, and we can use the spread operator to get functions that we just needed.
```js
import { roll } from './dice.mjs';

console.log(roll())
```

That's it.


## Export default

We can define what a package return by default.

```js
const roll = () => {
    return Math.floor(Math.random() * 6) + 1 
}

export default roll;
```

default exported function or variable can be imported directly without the destructuring syntax (`{}`).

```js
import roll from './dice.mjs';
``` 

## Time to run the program

we run node.js applications using `node program.js`, but since this feature is in the experimental stage we need to use the experimental flag to run

```
node --experimental-modules main.mjs 
```
Output will look like this,
```
(node:6983) ExperimentalWarning: The ESM module loader is experimental.
4
```

That's it :).