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

Javascript was not designed to access the operating system, but with Node.js it is possible to combine the advantages of the light programming language of Javascript with the powerful engine of V8.

**npm** (Node Package Manager)
    
-   Explain about the Event Loop in JavaScript, including terms like: blocking, non-blocking, event loop, callback que and "other" API's. Make sure to include why this is relevant for us as developers.
    
-   Explain the terms JavaScript Engine (name at least one) and JavaScript Runtime Environment (name at least two)
    
-   Explain (some) of the purposes with the tools Babel and WebPack and how they differ from each other. Use examples from the exercises.

## More being written
