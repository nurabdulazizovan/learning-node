import {Joblist} from "./collections";
import {CompanyCategory} from "../CompanyCategory/collections";
import {Applies} from "../applies/collections";


// Meteor.publish('get.vacancies', function(query={}) {
//     return Joblist.find(query);
// });


publishComposite('get.vacancies', function (query = {}) {

    return {
        find() {
            return Joblist.find(query);
        },
        children: [{
            find(job) {
                if (job) {
                    return Applies.find({vacancyId: job._id, userId: Meteor.userId()}, {
                        fields: {
                            userId: 1,
                            vacancyId: 1
                        }
                    });
                }
            }
        }]

    }
})


publishComposite('get.vacancies.with.user', function (query = {}) {

    return {
        find() {
            return Joblist.find(query);
        },
        children: [{
            find(job) {
                if (job.userId) {
                    return Meteor.users.find({_id: job.userid});
                    // console.log(user._id)
                }
            }
        }]

    }
})
publishComposite('get.vacancies.with.companycategory', function (query = {}) {

    return {
        find() {
            return Joblist.find(query);
        },
        children: [{
            find(job) {
                if (job.companycategory) {
                    return CompanyCategory.find({_id: job.companycategory});
                    // console.log(user._id)
                }
            }
        }]

    }
})

