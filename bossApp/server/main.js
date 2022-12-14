
import { Meteor } from 'meteor/meteor';
import  '../imports/startup/server/index'
import {CompanyCategory} from "../imports/api/CompanyCategory/collections";
import {ApplyStatus} from "../imports/api/ApplyStatus/collections";
Meteor.startup(() => {
    // code to run on server at startup
    let count = CompanyCategory.find({}).count();
    if(!count) {
        CompanyCategory.insert({category: "IT Company"})
        CompanyCategory.insert({category: "Finance Company"})
        CompanyCategory.insert({category: "Bank"})
        CompanyCategory.insert({category: "Consalting Company"})

    }
    let statusCount = ApplyStatus.find({}).count();
    if(!statusCount){
        ApplyStatus.insert({status: "Qebul edilib", value: 1});
        ApplyStatus.insert({status: "Redd edilib", value: 2});
    }
});
