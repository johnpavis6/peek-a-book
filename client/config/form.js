import defaultValues from './defaultValues';
let config = {};
config.getOptionsLabelAsValues = function (options) {
    return options.map(o => { return { label: o, value: o } });
}
config.forms = [
    {
        label: "User",
        fields: [
            { name: 'name', tag: 'input' },
            { name: 'rollNo', tag: 'input' },
            { name: 'phone', tag: 'input' },
            { name: 'email', tag: 'input' },
            { name: 'department', tag: 'select', options: config.getOptionsLabelAsValues(defaultValues.departments) },
            { name: 'year', tag: 'select', options: config.getOptionsLabelAsValues(defaultValues.years) },
            { name: 'campus', tag: 'select', options: config.getOptionsLabelAsValues(defaultValues.campuses) },
            { name: 'stayType', tag: 'select', options: config.getOptionsLabelAsValues(defaultValues.stayTypes) }
        ]
    }, {
        label: "Book",
        fields: [
            { name: 'bookName', tag: 'input' },
            { name: 'subjectName', tag: 'input' },
            { name: 'authorName', tag: 'input' }
        ]
    }, {
        label: "Buy Book",
        fields: [
            { name: 'studentId', tag: 'select' },
            { name: 'bookId', tag: 'select' }
        ]
    }
]
console.log(config.forms)
config.defaultForm = { selectedForm: 'user', fields: {}, errors: {} };
config.formTypes = config.forms.map(o => { return { label: config.forms[o].label, value: o } });
export default config;