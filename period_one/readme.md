# Overview

| Week |                                       Exercise                                       |
|:----:|:------------------------------------------------------------------------------------:|
|   1  | https://docs.google.com/document/d/1ad-D5zPpobOUAG5cdcFt1YU3yCAqilN2KOGzrjvWnq8/edit |
|   2  | https://docs.google.com/document/d/16uX1YKzWGGz4tG112zlxp93oSTtH7SNiNvpXtdLW7nM/edit |
|   3  | https://docs.google.com/document/d/1jpqmitlHKeIcWzDdbe-jO281xFQiGywP3c2iKCDeffQ/edit |
|   4  | https://docs.google.com/document/d/1PIMMeYPqN8Qzo4qsgjjuNAC0_15RIEVjD0DbBhcaP-0/edit |
|   5  | https://docs.google.com/document/d/1Lxg0SkcKzBkARM3nzS-82xHZfqgDECJA9blTbIjaJTQ/edit |

# Learning goals for period one
https://docs.google.com/document/d/1JQpBvRvFd-qMMV7srqNdYZ6GIYiBjOyxkWIuCJSk2Ec/edit


## Explain and Reflect:

-   Explain the differences between Java and JavaScript, Java and node.
    -   ```that Java is a compiled language and JavaScript a scripted language```
    
    **Compiled** languages are typically compiled to machine code and run on the hardware on the Operating System. For **Java**, the code is compiled into *bytecode* that is interpreted at runtime. (JVM). Compiled languages are meant to build programs that could be compiled into runnables, such as .jar or .exe. 
    ![https://beginnersbook.com/2013/05/jvm/](https://i.imgur.com/TyBLNrd.png)  
    **Scripted** languages are not compiled but interpreted from its source. They were built to use the existing resources of an app to act the way you want. For **Javascript** the browser will interpret each line of the code and run it.
    ([Great explanation]([https://web.stanford.edu/class/cs98si/slides/overview.html](https://web.stanford.edu/class/cs98si/slides/overview.html)))
	-   ```Java is both a language and a platform```
  
	**Java as a language** is an class-based Object-Oriented programming language. Java is meant to be run on any device as long as it supports the Java platform. Google's Android SDK uses Java language but not for anything else.  
    **Java as a platform** at its core has the Java Virtual Machine (JVM) which executes the bytecode. The platform compiles to bytecode for the sake of the *write once, run anywhere* (WORA) principle. This means that the code can run on any JVM regardless of the underlying architecture.
    The Java platform also provides compilers for other languages such as Javascript, Python and Ruby.
	-  ```General differences in language features.```
  
	**Java** is a compiled language that works with bytecode and is executed through the JVM which ensures OS support (Windows, Linux, iOS). When compiling, the code is checked for several things, including types. This is called **static type checking** and it finds errors during development of the code. Since the compiler knows what types are used, the code in the end is typically run faster.  
Java is through the JVM a multi-threaded language, but there are several blocking operations which should be accounted for by the developer using the included Java multithreading API.  
**Javascript** is a interpreted scripting language, meaning that the code is read line-for-line by the browsers engine. Javascript uses **dynamic type checking** which results in simpler code, but in return might produce errors after development.
	Javascript is single-threaded and concurrency is implemented not through threading but by delegating any future tasks out to relevant APIs. *(Event loop)*
    
	-   ```Blocking vs. non-blocking```  
  **Blocking** (*Synchronous*) is when the code execution halts as it waits for a process to finish.  
  **Non-blocking** (*Asynchronous*) is the opposite where the main thread continues to work.
  
-  ```Node.js, when it “makes sense” and npm, and how it “fits” into the node ecosystem.```  

Javascript was not designed to access the operating system, but with Node.js (a Javascript runtime) it is possible to combine the advantages of the light programming language of Javascript with the powerful engine of V8.  
Node.js excels at asynchronous non-blocking operations, such as I/O. It was used to develop apps for Paypal, Linkedin, Netflix & Uber - all apps that needs to handle hundreds of thousands of users, generate their output based on input, all at the same time, connecting to different services.  
It has great scalability and in conjunction with npm the possibilties are endless.

**npm** (Node Package Manager) handles packages (also "modules") of code shared between developers. Much like libraries and frameworks, utilities that are often-needed can be accessed and save valuable time, increase performance and much more. See: lodash, react, request, express, uuid.
    
-   ```Explain about the Event Loop in JavaScript, including terms like: blocking, non-blocking, event loop, callback que and "other" API's. Make sure to include why this is relevant for us as developers.```
<img src="eventloop.gif" height="400" width="750">  

([Video](https://youtu.be/8aGhZQkoFbQ) | [.mp4 of gif](https://i.imgur.com/QayP3Nm.mp4))  
The stack is only occupied by the call to the other API, and can then continue until the stack is empty, then checking the task queue for the callback.

Javascript is single-threaded and therefore you usually see a lot of blocking in your code.  
The way to handle this is by delegating the blocking code to other APIs. 

If the code requires a lot of work done, you can reduce the time it takes by initializing it, delegating it, and then providing it as it is ready. The alternative is to start work on one task, wait til completion, and then begin the next. The way node.js handles callbacks and asynchronous actions reduced loadtime for Netflix by 70%.
    
-   ```Explain the terms JavaScript Engine (name at least one) and JavaScript Runtime Environment (name at least two)```  

**Javascript Engine** is the program that executes the code. Engines started out as simple interpreters, executing code line-by-line.  
Modern engines has Just-In-Time compilation (JIT) which compiles parts of the program where optimization can be found during runtime, opposite of compiling code before runtime. It is generally faster overall, despite a slight startup delay.  

[Notable engines](https://en.wikipedia.org/wiki/JavaScript_engine#Notable_engines)  
V8 from Google powers Chrome, Chromium-apps and Node.js.  
SpiderMonkey from Mozilla powers Firefox.  
Charka from Microsft was used for Edge, which now instead uses V8.

The **Javascript Runtime Environment** is the outer shell ("container"), of which you typically communicate with. This is where stack, heap, garbage collector and other features reside. This is also where all the events that Javascript relies upon are handled, as well as the calls to the other APIs for concurrency are handled.

Javascript and Node.js both use V8, but they have very different runtime environments: in Chrome you have the window, DOM objects etc, while node gives you require, Buffers and processes.

-   ```Explain (some) of the purposes with the tools Babel and WebPack and how they differ from each other. Use examples from the exercises.```

**Babel** is a transpiler. For *older* browsers we often use polyfills for newer features that have yet to be implemented. Babel helps us by allowing us to use certain features across browsers, despite them not being available yet. Typically this is done from e.g. ES6 -> ES5, but it could also be for ESNext -> (CurrentES).

**Webpack** was used this semester as a bundler. It systematically looks throughout your files and bundles them into a pre-decided package, e.g. `bundle.js`. You can apply several techniques underway, such as minifying.

These tools use several dependencies and loaders that are all downloaded through **npm** and then bundled together for maximum efficiency.

## Explain using sufficient code examples the following features in JavaScript (and node) STILL BEING WRITTEN

-   ```Variable/function-Hoisting```
    
-   ```this in JavaScript and how it differs from what we know from Java/.net.```
    
-   ```Function Closures and the JavaScript Module Pattern```
    
-   ```User-defined Callback Functions (writing your own functions that take a callback)```
    
-   ```Explain the methods map, filter  and reduce```
    
-   ```Provide examples of user-defined reusable modules implemented in Node.js (learnynode - 6)```
    
-   ```Provide examples and explain the es2015 features: let, arrow functions, this, rest parameters, destructuring objects and arrays, maps/sets etc.```
    
-   ```Provide an example of ES6 inheritance and reflect over the differences between Inheritance in Java and in ES6.```
    
-   ```Explain and demonstrate, how to implement your own events, how to emit events and how to listen for such events```
    

## ES6,7,8,ES-next and TypeScript

-   ```Provide examples with es-next, running in a browser, using Babel and Webpack```
    
-   ```Explain the two strategies for improving JavaScript: Babel and ES6 (es2015) + ES-Next, versus Typescript. What does it require to use these technologies: In our backend with Node and in (many different) Browsers```
    
-   ```Provide a number of examples to demonstrate the benefits of using TypeScript, including, types, interfaces, classes and generics```
    
-   ```Explain the ECMAScript Proposal Process for how new features are added to the language (the TC39 Process)```
    

## Callbacks, Promises and async/await

Explain about (ES-6) promises in JavaScript including, the problems they solve, a quick explanation of the Promise API and:

-   ```Example(s) that demonstrate how to avoid the callback hell (“Pyramid of Doom")```
    
-   ```Example(s) that demonstrate how to execute asynchronous (promise-based) code in serial or parallel```
    
-   ```Example(s) that demonstrate how to implement our own promise-solutions.```
    
-   ```Example(s) that demonstrate error handling with promises```
    

  

## Explain about JavaScripts async/await, how it relates to promises and reasons to use it compared to the plain promise API.

Provide examples to demonstrate

-   ```Why this often is the preferred way of handling promises```
    
-   ```Error handling with async/await```
    
-   ```Serial or parallel execution with async/await.```
