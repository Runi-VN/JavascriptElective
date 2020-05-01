var express = require('express');
var graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
      """
      Roll a given number of di(c)e and given number of sides (default 6)
      """
    rollDice("amt of dice" numDice: Int!, "amt of sides" numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
	rollDice: ({numDice, numSides}) => {
		console.log(numDice, numSides);
		var output = [];
		for (var i = 0; i < numDice; i++) {
			output.push(1 + Math.floor(Math.random() * (numSides || 6)));
		}
		return output;
	},
};

var app = express();
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
