const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// var id = '58a8783aaa9da53417a27c0511';

// if(!ObjectID.isValid(id)){
//   console.log('Id not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo',todo);
// });


// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo by id',todo);
// }).catch((e)=>console.log(e));

User.findById('58a6b991448fc42bf41d4bf9').then((user)=>{
  if(!user){
    return console.log(('Unable to find user'));
  }
  console.log(JSON.stringify(user,undefined,2));
},(e)=>{
  console.log(e);
});
