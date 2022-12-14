import {Joblist} from "./collections";

Meteor.methods({
    'add.vacancy': function (dataVacancy) {
        return Joblist.insert(dataVacancy)
    },
    'remove.vacancy': function (_id) {
        return Joblist.remove(_id);
    },
    'edit.vacancy': function (_id, editVacancy) {
        return Joblist.update(
            {_id},
            {
                $set: {
                    vacancyname: editVacancy.vacancyname,
                    companyname: editVacancy.companyname,
                    companycategory: editVacancy.companycategory,
                    location: editVacancy.location,
                    aboutcompany: editVacancy.aboutcompany,
                    aboutvacancy: editVacancy.aboutvacancy,
                    jobrecruitment: editVacancy.jobrecruitment,
                }
            }
        )
    }
});