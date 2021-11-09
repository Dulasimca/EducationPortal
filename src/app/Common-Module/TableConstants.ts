import { OnInit } from "@angular/core";

export class TableConstants {
   
        public static readonly TQuestionBankColumns = [
            { field: 'subject', header: 'Subject' },
            { field: 'Description', header: 'Description' },
            { field: 'Class', header: 'Class' },
            { field: 'Medium', header: 'Medium' },
            { field: 'Pdate', header: 'Publish Date' },
            { field: 'ShortYear', header: 'Academic year' },
            { field: 'FileName', header: 'File Uploaded' },
        ];

        public static readonly SQuestionBankColumns = [
            { field: 'Subjectname', header: 'Subject' },
            { field: 'Description', header: 'Description' },
            { field: 'Publishdate', header: 'Publish Date' },
            { field: 'ShortYear', header: 'Academic year' },
        ]
}