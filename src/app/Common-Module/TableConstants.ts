import { OnInit } from "@angular/core";

export class TableConstants {
   
        public static readonly TQuestionBankColumns = [
            { field: 'Subjectname', header: 'Subject', align: 'left !important', width: '50px' },
            { field: 'Description', header: 'Description', align: 'left !important', width: '80px' },
            { field: 'Class', header: 'Class', align: 'left !important', width: '20px' },
            { field: 'MediumName', header: 'Medium', align: 'left !important', width: '35px' },
            { field: 'Pdate', header: 'Publish Date', align: 'center !important', width: '40px' },
            { field: 'FileName', header: 'File Uploaded', align: 'left !important', width: '150px' },
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
            { field: 'SubjectName', header: 'Subject', align: 'left !important' },
            { field: 'Classname1', header: 'Class', align: 'left !important' },
            { field: 'SectionName', header: 'Section', align: 'left !important' },
            { field: 'MeetingTime', header: 'Time', align: 'center !important' },
            { field: 'DurationWithType', header: 'Duration', align: 'left !important' },
            { field: 'CreatedDate', header: 'Created Date', align: 'center !important' },
        ];

        public static readonly MyAchievementsCoulmns =  [
            { field: 'eventdate', header: 'Event Date', align: 'center !important' },
            { field: 'CategoryName', header: 'Category', align: 'left !important' },
            { field: 'EventDetailS', header: 'Event Title', align: 'left !important' },
            { field: 'Place', header: 'Place', align: 'left !important' },
            { field: 'AchievementName', header: 'Status', align: 'left !important' },
          ];

        public static readonly PollListColumns = [
            { field: 'FirstName', header: 'Nominee Name', align: 'left !important' },
            { field: 'Class', header: 'Class-Section', align: 'left !important' },
          ];

        public static readonly CircularColumns = [
            {field: 'CircularDate',header: 'Circular Date', width: '90px', align: 'center !important'},
            {field:'Subject',header: 'Subject', width: '150px', align: 'left !important'},
            {field: 'Details',header: 'Details', width: '450px', align: 'left !important'},
          ];
        
        public static readonly NewsLetterColumns =  [
            {field:'NewsDate',header: 'Date', width: '70px', align: 'center !important'},
            {field:'Topic',header: 'Topic', width: '300px', align: 'left !important'}, 
          ];
}