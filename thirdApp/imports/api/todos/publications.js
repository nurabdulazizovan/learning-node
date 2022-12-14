import { Todos } from "./collections";



Meteor.publish('get.todos', function() {
    return Todos.find({});
});