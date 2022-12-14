import { Meteor } from 'meteor/meteor';
import '../imports/startUp/server/index'
import {Categories} from "../imports/api/categories/collections";

Meteor.startup(() => {
    let count = Categories.find({}).count();
    if(!count) {
        Categories.insert({text: "electronic"})
        Categories.insert({text: "fashion"})
    }
    // code to run on server at startup
});