## ES2099 Spec

Welcome to the future.

### Backstory

It was 9:22pm PDT, March 31st. I had been working diligently on a groundbreaking new framework, when suddenly, my computer monitor turned off. Strange, I thought, must be a Yosemite bug. After a few seconds, it turned back on again. All was good... or so it seemed. After writing more groundbreaking code, I went to test it. However, a warning was in my console:

```
WARNING: The proper ES2099 directive was not set. This code is running in quirks mode, to ensure full compatibility.
```

I was perplexed. What was ES2099? None of my code seemed to run either... until about 10 seconds later, when the first function I declared fired. Then, 10 seconds later, another. I knew something was wrong. 

```
$ date
Tue 31 Mar 2099 21:26:36 PDT
```

That didn't seem right. Maybe a time server messed up. Then, I googled "ES2099", and there it was:

![es2099](http://f.cl.ly/items/3o3y3L3E2R23330o0K1p/Image%202015-03-31%20at%209.34.38%20PM.png)

There it was, in all its glory. ES2099. I knew what I had to do: download it. I quickly did so. Suddenly, Chrome crashed. My monitor turned off and on.

```
$ date
Tue 31 Mar 2015 21:30:21 PDT
$ ls ~/Downloads
es2099-draft.html
```

## Welcome to ES2099.

ES2099 truly is the future. However, since no browsers support it yet, I've created a transpiler.

```
$ npm install es2099 -g
$ es2099 in.js > out.js
```

### Spec

Unfortunately, I soon found out my copy of the ES2099 spec was corrupted. It only downloaded part of it. So, I can only implement what I know, plus what's feasible with current day browsers. (I tried very hard to implement `StreamingPromiseGenerator`, but to no avail) Here's what I have implemented:

#### ES2099 Standard Style

Over the years, there were way too many arguments about JS formatting. It seems that ES2099 fixed this, by defining the [ES2099 Standard Style](https://github.com/feross/standard). If you wish to have your code be ES2099 ready, it must be written in this style. No arguments. It's the way of the future.

#### ES2099 Directive

As JS evolved, many browser vendors introduced their own directives to ensure their browser had the best performance. However, there were just too many directives. So, ES2099 created a standardized directive, like a DOCTYPE. It was carefully crafted to ensure backwards compatibility. To enable ES2099, include this directive as your first line:

```js
'use stricter+strictest-superstrict+es2099ready'
```

In particular, this enables `stricter`, `strictest`, and `es2099ready`. It disables `superstrict`, as this directive was found to cause too many problems. This *must* be the first line exactly, otherwise your JS will run in quirks mode. Quirks mode will only run one function every 10 seconds, to ensure compatibility with old slow browsers.

#### main() declaration

All JS must now have a `main` function for browsers to call, so they don't have to guess about what function to call first. This is an amazing performance enhancement. Define it in the root of your file, as so:

```js
function main () {
  // your super fast code here
}
```

The ES2099 spec mentioned that there are talks to make it asynchronous in future specs, but major discussion was still under place.

#### All variables are constants

Another performance improvement, ES2099 requires all variables are constants. This allows browsers to optimize variables, as they will never be changed.

```js
var foo = 'bar' // nope
let baz = 'bat' // ew!
const future = true // nice
```

#### null's type is a string

Many people never understood why `null` had the type of an `object`. It turns out the spec writers didn't either, and instead turned it into a `string`. This greatly improves performances, due to `string`s requiring less memory than an `object.`

```js
typeof null
// 'string'
```

#### Promises become Monads

Promises were revolutionary in ES2015. However, learning from "The Great Languages" (there was no context for this), they were instead renamed `Monad`. They have the same API, they're just Monads.

```js
var p = new Promise() // ah ah ah!
var m = new Monad() // groovy
```

### Compatiblity

ES2099 is compatible with every version before it (except ES2074... there's just a note not to talk about it). Because of this, all scripts are run through [`babel`](https://github.com/babel/babel) to create ES5 output. As well, if there are any ES2099 errors, your code will be run in Quirks mode.

### Future

Here's the thing: I can't be the only one that this will ever happen to. So, if you happen to travel into the future and get a copy of ES2099, please feel free to send a PR to improve what we know of ES2099. Of course, by the time you see it, it may be changed because of what I have done.

... Oh no, what have I done.
