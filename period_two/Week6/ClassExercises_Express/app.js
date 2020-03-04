const express = require('express');
const app = express();
const port = 3000;

//Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', function(req, res) {
	res.send('Got a POST request');
});

app.put('/user', function(req, res) {
	res.send('Got a PUT request at /user');
});

app.delete('/user', function(req, res) {
	res.send('Got a DELETE request at /user');
});
//Static folder
app.use(express.static('public'));
// >public\cat1.png is bad, as its URL is http://localhost:3000/cat1.png
//Better is >public\images\cat2.png, as its url is http://localhost:3000/images/cat2.png
app.use(express.static('files')); //unused, but note that the directories are loaded in order. Most used firstly?

//Really nice function to have a unified directory name:
app.use('/static', express.static('public'));
//http://localhost:3000/static/cat1.png
//http://localhost:3000/static/images/cat2.png

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
