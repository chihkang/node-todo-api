// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unablt to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id:new ObjectID("58a5bb5cc58ee500acc7125f")
  // },{
  //   $set:{
  //     completed:true
  //   }
  // },{
  //     returnOriginal:false
  // }).then((result)=>{
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id:new ObjectID("58a50887b470d302cb93cf42")
  },{
    $set:{
      name:'Chihkang'
    },
    $inc:{
      age:1
    }
  },{
      returnOriginal:false
  }).then((result)=>{
    console.log(result);
  });

  // db.close();
});
