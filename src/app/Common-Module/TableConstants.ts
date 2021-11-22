import { OnInit } from "@angular/core";

export class TableConstants {
   
        public static readonly TQuestionBankColumns = [
            { field: 'Subjectname', header: 'Subject', align: 'left !important', width: '90px' },
            { field: 'Description', header: 'Description', align: 'left !important', width: '150px' },
            { field: 'Class', header: 'Class', align: 'left !important', width: '60px' },
            { field: 'MediumName', header: 'Medium', align: 'left !important', width: '80px' },
            { field: 'Pdate', header: 'Publish Date', align: 'center !important', width: '130px' },
            { field: 'FileName', header: 'File Uploaded', align: 'left !important', width: '230px' },
        ];

        public static readonly SQuestionBankColumns = [
            { field: 'Subjectname', header: 'Subject', align: 'left !important' },
            { field: 'Description', header: 'Description', align: 'left !important' },
            { field: 'Publishdate', header: 'Publish Date', align: 'center !important' },
            { field: 'ShortYear', header: 'Academic year', align: 'left !important' },
        ];

        public static readonly MyBooksColumns =  [
            { field: 'Years', header: 'Academic Year', align: 'left !important' },
            { field: 'subjects', header: 'Subject', align: 'left !important' },
            { field: 'authorReference', header: 'Author/Reference', width: '300px', align: 'left !important' },
            { field: 'CreatedDate', header: 'Published date', align: 'center !important' },
          ];

        public static readonly OnlineClassroomColumns = [
            { field: 'SubjectName', header: 'Subject', align: 'left !important' },
            { field: 'Classname1', header: 'Class', align: 'left !important' },
            { field: 'SectionName', header: 'Section', align: 'left !important' },
            { field: 'MeetingTime', header: 'Time', align: 'left !important' },
            { field: 'Duration', header: 'Duration', align: 'left !important' },
            { field: 'MeetingDate', header: 'Meeting Date', align: 'center !important' },
          ];

        public static readonly MCQTestResultColumns = [
            { field: 'subject', header: 'Subject', align: 'left !important' },
            { field: 'test', header: 'Test Name', align: 'left !important' },
        ]

        public static readonly RegisteredAssociateColumns = [
            { field: 'FirstName', header: 'Name', align: 'left !important' },
            { field: 'dob', header: 'D.O.B', align: 'center !important' },
            { field: 'doj', header: 'D.O.J', align: 'center !important' },
            { field: 'CurrentAddress', header: 'CurrentAddress', align: 'left !important' },
            { field: 'EmailId', header: 'Email Address', align: 'left !important' },
            { field: 'PhoneNumber', header: 'Mobile No.', align: 'left !important' },
        ];

        public static readonly OnlineAssessmentColumns = [
            { field: 'test', header: 'Test Name', align: 'left !important' },
            { field: 'description', header: 'Description', align: 'left !important' },
            { field: 'totalmarks', header: 'Total Marks', align: 'right !important' },
            { field: 'subject', header: 'Subject', align: 'left !important' },
            { field: 'duration', header: 'Duration', align: 'left !important' },
            { field: 'time', header: 'Start Time', align: 'left !important' },
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

        public static readonly FeesColumns =  [
            {field: 'FeeName', header: 'Fee Name', align: 'left !important'},
            { field: 'FeeType', header: 'Fee Type', align: 'left !important'},
            { field: 'CreatedDate', header: 'Pay Date', align: 'center !important'},
            { field: 'PayMethod', header: 'Pay Method', align: 'left !important'},
            { field: 'PaidAmount', header: 'Paid Amount', align: 'right !important'},
            { field: 'duedate', header: 'Due Date', align: 'center !important'},
          ];

        public static readonly AssignmentsColumns =  [
            { field: 'AssignmentDate', header: 'Date', align: 'center !important'},
            { field: 'AssignmentDueDate', header: 'Due Date',  align: 'center !important'},
            { field: 'AssignmentWork', header: 'Assigned Work',  align: 'left !important'},
            { field: 'AssignmentName', header: 'Assigned Type',  align: 'left !important'},
            { field: 'Subjectname', header: 'Subject Name',  align: 'left !important'},
        ];

        public static readonly AssignmentColumns = [
          { field: 'AssignmentDate', header: 'Date', width: '100px', align: 'center !important'},
          { field: 'AssignmentDueDate', header: 'Due Date',  width: '100px' ,align: 'center !important'},
          { field: 'Class', header: 'Class',  width: '100px' ,align: 'center !important'},
          { field: 'AssignmentWork', header: 'Assigned Work',  width: '150px' ,align: 'left !important'},
          { field: 'AssignmentName', header: 'Assigned Type',  width: '150px' ,align: 'left !important'},
          { field: 'Subjectname', header: 'Subject Name',  width: '100px' ,align: 'left !important'},
        ]

        public static readonly AnnouncementsColumns =  [
            { field: 'Announcementdate', header: 'Date', width: '70px', align: 'center !important' },
            { field: 'AnnouncementTag', header: 'Title', width: '100px', align: 'left !important'},
            { field: 'Announcement', header: 'Announcement', width :'400px', align: 'left !important' },
            ];

        public static readonly HolidayDetailsColumns = [
            { field: 'HolidayName', header: 'Type', align: 'left !important' },
            { field: 'eventdate', header: 'Date', align: 'center !important' },
            { field: 'EventDetailS', header: 'Events', align: 'left !important' },
          ];

        public static readonly NewsLetterDetailsColumns = [
            {field:'NewsDate',header: 'Date', align: 'center !important'},
            {field:'Topic',header: 'Topic', align: 'left !important'},
            {field: 'Download',header: 'Uploaded File', align: 'left !important'},
            {field: 'CreatedDate',header: 'Uploaded Date', align: 'center !important'},
          ];

        public static readonly CircularDetailsColumns = [
            {field: 'CircularDate',header: 'Circular Date', align: 'center !important'},
            {field:'Subject',header: 'Subject', align: 'left !important'},
            {field: 'Details',header: 'Details', width: '500px', align: 'left !important'},
            {field: 'Download',header: 'Uploaded File', width: '500px', align: 'left !important'},
          ];
      
        public static readonly FeesDetailsColumns = [
            { field: 'DueDateFormatted', header: 'Due Date', align: 'center !important'},
            { field: 'Class', header: 'Class' , align: 'left !important'},
            { field: 'Section', header: 'Section', align: 'left !important'},
            { field: 'FirstName', header: 'Name', align: 'left !important'},
            { field: 'FeeType', header: 'Receipt Book' , align: 'left !important'},
            { field: 'FeeName', header: 'Fee Name', align: 'left !important'},
            { field: 'ActualAmount', header: 'Actual Amount' , align: 'right !important'},
            { field: 'PaidAmount', header: 'Paid Amount', align: 'right !important'},
            { field: 'OutstandingAmount', header: 'Outstanding Amount' , align: 'right !important'},
            { field: 'PayingAmount', header: 'Paying Amount' , align: 'right !important'},
            { field: 'FineAmount', header: 'Fine', align: 'right !important'},
          ];

        public static readonly ResultEntryColumns = [
          { field: 'ExamName', header: 'Exam Name' , align: 'left !important'},
          { field: 'ExamDate', header: 'Exam Date' , align: 'center !important'},
          { field: 'Class', header: 'Class' , align: 'left !important'},
          { field: 'Section', header: 'Section' , align: 'left !important'},
          { field: 'Subject', header: 'Subject' , align: 'left !important'},
          { field: 'Topic', header: 'Topic' , align: 'left !important'},
          { field: 'TotalMarks', header: 'Total Marks' , align: 'right !important'},
          { field: 'Student', header: 'Student' , align: 'left !important'},
          { field: 'MarksScored', header: 'Marks Scored' , align: 'right !important'},
        ];

        public static readonly NomineeFormColumns = [
          { field: 'FirstName', header: 'Nominee Name', align: 'left !important' },
          { field: 'Class', header: 'Class', align: 'left !important' },
          { field: 'startDate', header: 'Election Date', align: 'center !important' },
          { field: 'endDate', header: 'ElectionName', align: 'center !important' },
        ];
            
}