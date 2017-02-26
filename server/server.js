require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const {ObjectID} = require('mongodb');

var app = express();

const port = process.env.PORT || 3000;

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

app.delete('/todos/:id',(req,res)=>{
  // get the id
  var id = req.params.id;
  // Validate the id -> not Valid? return 404
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo)=>{
    // success
      // if no doc, send 404
      // if doc, send doc back with 200
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    // error
      // 400 with empty body
  }).catch((e)=>{
    res.status(400).send();
  });

});

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  })

});

// POST /users
app.post('/users',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});

app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
});

// POST /users/login {email,password}
app.post('/users/login',(req,res)=>{
  var body = _.pick(req.body,['email','password']);

  User.findByCredentials(body.email,body.password).then((user)=>{
    user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    });
  }).catch((e)=>{
    res.status(400).send();
  });

  // res.send(body);
});

app.delete('/users/me/token',authenticate,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  })
});

app.listen(port,()=>{
  console.log(`Started up at port ${port}`);
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
