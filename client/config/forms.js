import { defaultValues } from './defaultValues';
import Common from './Common';
exports.forms = {
    "User": {
        url: 'users/all',
        fields: [
            { name: 'name', tag: 'input' },
            { name: 'rollNo', tag: 'input' },
            { name: 'phone', tag: 'input' },
            { name: 'email', tag: 'input' },
            { name: 'department', tag: 'select', options: Common.getOptionsLabelAsValues(defaultValues.departments) },
            { name: 'year', tag: 'select', options: Common.getOptionsLabelAsValues(defaultValues.years) },
            { name: 'campus', tag: 'select', options: Common.getOptionsLabelAsValues(defaultValues.campuses) },
            { name: 'stayType', tag: 'select', options: Common.getOptionsLabelAsValues(defaultValues.stayTypes) }
        ],
        renderData: Common.getBooks,
    },
    "Book": {
        url: 'books/all',
        fields: [
            { name: 'bookName', tag: 'input' },
            { name: 'subjectName', tag: 'input' },
            { name: 'authorName', tag: 'input' }
        ],
        renderData: Common.getBooks,
    },
    "Buy book": {
        url: 'buy-books/all',
        fields: [
            { name: 'studentId', tag: 'select' },
            { name: 'bookId', tag: 'select' }
        ],
        renderData: Common.getBooks,
    }
}