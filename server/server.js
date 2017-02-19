const express = require('express');

const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');

var {Todo} = require('./models/todo');

var {User} = require('./models/user');

const {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text:req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  })
});

// GET /todos/134234234
app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  // Valid id using isValid
    // 404 - send back empty send
  if(!ObjectID.isValid(id)){
    return res.status(404).send({});
  }

  // findById
    // success
      // if todo - send it back
      // if no todo - send back with empt body
    // error
      // 400 - and send empty body back
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send({});
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });

});

app.listen(3000,()=>{
  console.log('Started on port 3000');
});

module.exports ={app};

// var newTodo = new Todo({
//   text:'Cook dinner'
// });
//
// newTodo.save().then((doc)=>{
//   console.log('Save todo',doc);
// },(e)=>{
//   console.log('Unable to save todo');
// });

// var otherTodo = new Todo({
//   text:'Something to do'
// });
//
// otherTodo.save().then((doc)=>{
//   console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//   console.log('Unable to save',e);
// });

// User
// email - required - trim it -set Type -set min length of 1


// var user = new User({
//   email:'chihkang@me.com      '
// });
//
// user.save().then((doc)=>{
//   console.log(doc);
// },(e)=>{
//   console.log('Unabler to save user',user);
// });
