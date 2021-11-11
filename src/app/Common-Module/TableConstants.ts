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
        ];

        public static readonly RegisteredAssociateColumns = [
            { field: 'FirstName', header: 'Name' },
            { field: 'DateofBirth', header: 'D.O.B' },
            { field: 'DateofJoining', header: 'D.O.J' },
            { field: 'GenderName', header: 'Gender' },
            { field: 'CasteName', header: 'Caste' },
            { field: 'CurrentAddress', header: 'CurrentAddress' },
            { field: 'EmailId', header: 'Email Address' },
            { field: 'PhoneNumber', header: 'Mobile No.' },
            { field: 'FatherName', header: 'Father Name' },
        ];

        public static readonly OnlineAssessmentColumns = [
            { field: 'test', header: 'Test Name' },
            { field: 'description', header: 'Description' },
            { field: 'totalmarks', header: 'Total Marks' },
            { field: 'subject', header: 'Subject' },
            { field: 'duration', header: 'Duration' },
            { field: 'time', header: 'Start Time' }
        ];

        public static readonly OnlineAssessmentDetailColumns = [
            { field: 'subject', header: 'Subject' },
            { field: 'description', header: 'Description' },
            { field: 'totalmarks', header: 'Total Marks' },
        ];

        public static readonly ClassroomDetailsColumns = [
            { field: 'SubjectName', header: 'Subject' },
            { field: 'Classname1', header: 'Class' },
            { field: 'SectionName', header: 'Section' },
            { field: 'MeetingTime', header: 'Time' },
            { field: 'DurationWithType', header: 'Duration' },
        ];
}