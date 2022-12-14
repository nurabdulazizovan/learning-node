import {UserResumes} from "./collections";

Meteor.publish('get.resumes', function(query={}) {
    return UserResumes.find(query).cursor;
});