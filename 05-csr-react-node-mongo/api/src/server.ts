import app from './app.js';

//Environment Variables, by default we are at development set by express
//By Express:
// console.log(app.get('env')); // development
//By Node, everything comes from the node.js core process module: NODE_ENV=development X=23 nodemon server.js
// console.log(process.env);

// 4) SERVER

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Connected to port: ${port}!`);
});
