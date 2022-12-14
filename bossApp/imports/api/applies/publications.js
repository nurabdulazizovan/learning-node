import {Joblist} from "../jobList/collections";
import {UserResumes} from "../resumes/collections";
import {Applies} from "./collections";


publishComposite('get.apply.with.user', function (query = {}) {

    return {
        find() {
            return Applies.find(query);
        },
        children: [
            {
                find(resume) {
                    if (resume._id) {
                        return UserResumes.find({_id: resume.resumeId}).cursor;
                    }
                }
            }
        ]

    }
})

// publishComposite('get.apply.with.admin', function (query = {}) {
//
//     return {
//         find() {
//             return Joblist.find(query);
//         },
//         children: [
//             {
//                 find(job) {
//                     if (job._id) {
//                         return Applies.find({vacancyId: job._id});
//                     }
//                 },
//                 children: [
//                     {
//                         find(apply) {
//                             if (apply.userId) {
//                                 return UserResumes.find({userId: apply.userId}).cursor;
//                             }
//                         }
//
//                     }
//                 ]
//
//             },
//
//         ]
//
//     }
// })

publishComposite('get.apply.with.admin', function (query = {}) {



    console.log('birinci',query)

    console.log(query)
    return {
        find() {
            return Applies.find(query);
        },
        children: [
            {
                find(apply) {
                    if (apply.vacancyId) {
                        return Joblist.find({_id: apply.vacancyId});
                    }
                }
            }, {

                find(apply) {
                    if (apply.userId) {
                        return Meteor.users.find({_id: apply.userId});
                    }
                }


            },

        ]

    }
})




publishComposite('get.apply.with.appliers', function (query = {}) {



    console.log('biriasd asdf adsfa sdf asdfa nci',query)

    console.log(query)
    return {
        find() {
            return Applies.find(query);
        },
        children: [
            {
                find(apply) {
                    if (apply.vacancyId) {
                        return Joblist.find({_id: apply.vacancyId});
                    }
                }
            }

        ]

    }
})