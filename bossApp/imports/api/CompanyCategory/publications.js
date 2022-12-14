import {CompanyCategory} from "./collections";
import {Joblist} from "../jobList/collections";

Meteor.publish('get.company.with.category', function() {
    return CompanyCategory.find({},{fields: { categoryId: 1, category: 1}});
});
