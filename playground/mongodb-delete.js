// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unablt to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name:'Chihkang'});

  db.collection('Users').findOneAndDelete({
    _id:new ObjectID("58a50b14c0ed9502e1eeaed9")
  }).then((result)=>{
    console.log(JSON.stringify(result,undefined,2));
  });

  // db.close();
});
