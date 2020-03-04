# Week 6 - Express

Express FAQ: https://expressjs.com/en/starter/faq.html  
Express best practice: https://expressjs.com/en/advanced/best-practice-performance.html  
**Important notes from above**:
- Don’t use synchronous functions
  - use the --trace-sync-io command-line flag to print a warning and a stack trace whenever your application uses a synchronous API.  
- `Debug()` instead of `console.log()`  
- [Use promises](https://expressjs.com/en/advanced/best-practice-performance.html#use-promises) over try-catch due to its synchronous nature  
- Follow [the suggestions for a production setup](https://expressjs.com/en/advanced/best-practice-performance.html#in-environment)


## Exercises
https://docs.google.com/document/d/1W8b6hihu1WyTduhzejUQ6mTSeCvax2PJLt5F9wUCEnQ/edit


## Questions  
While you watch [Mosh's video](https://www.youtube.com/watch?v=pKd0Rpw7O48) make sure to write down the following info which you need for the comming days:

- How to, dynamically, assign a port number via an environment variable  
```js
const PORT = process.env.PORT || 3333; //Either .env.PORT or 3333
const server = app.listen(PORT)
console.log(`Server started, listening on port: ${PORT}`)
```

- How to use nodemon, to dynamically restart the server, whenever we make changes to our code  
`nodemon <filename.ext>`:
```
nodemon app.js
```  
In start code: `npm run dev:watch`

- How to read request parameters (/:id)  
```js
app.get('/api/courses/:id', (req, res) =>{
  res.send(req.params.id); //returns ID as response. req.params.<paramName>
});
```
More details for `req.params` or multi-params, see: https://youtu.be/pKd0Rpw7O48?t=1305  

- How to read query parameters (/?sort=asc)  
```js
app.get('/api/courses/:id', (req, res) =>{
  res.send(req.query); //returns query as response. req.query.<queryName>
});
```

- How to read the request body (typically for POST or PUT)  

**Reading body (POST)**  
```js
app.post('/api/courses', (req,res) => {
  res.send(req.body); //returns body as response. req.body.<paramName> (accessing json field)
});
```  

**Receiving (POST)**  
```js
//<courses obj>

app.post('/api/courses', (req,res) => {
  const course = {
    id: courses.length +1, //increment ID
	name: req.body.name
  };
  courses.push(course)
  res.send(course)
});
```  

