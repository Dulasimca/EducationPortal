import { Component, OnInit } from '@angular/core';
import { TestConfig } from 'src/app/Helper-Module/testconfig';
import { Test } from 'src/app/Helper-Module/test';
import { Question } from 'src/app/Helper-Module/question';
import { Option } from 'src/app/Helper-Module/option';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { AssessmentService } from 'src/app/Services/online-test.service';
@Component({
    selector: 'app-online-test',
    templateUrl: './online-test.component.html',
    styleUrls: ['./online-test.component.css']
})
export class OnlineTestComponent implements OnInit {
    testName: string;
    subjectcName: string;
    totalMarks: number;
    duration: string = '';
    questionTypeID: number;
    answerData: any[] = [];
    timer: any = null;
    startTime: Date = new Date();
    endTime: Date;
    totalDuration: number;
    ellapsedTime = "00:00";
    config: TestConfig = {
        allowBack: true,
        allowNext: true,
        allowReview: true,
        autoMove: false, // if true, it will move to next question automatically when answered.
        duration: 1800, // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
        pageSize: 1,
        requiredAll: false, // indicates if you must answer all the questions before submitting.
        richText: false,
        shuffleQuestions: false,
        shuffleOptions: false,
        showClock: false,
        showPager: true,
        theme: "none"
    };
    data: any;
    test: Test = new Test(null);
    pager = {
        index: 0,
        size: 1,
        count: 1
    };
    constructor(private restApiService: RestAPIService, private testService: AssessmentService) { }

    ngOnInit(): void {
        this.ellapsedTime = "00:00";
        this.loadQues();
        this.loadTest();
    }

    loadTest() {
        this.test = new Test(this.data);
        this.config.duration = (this.totalDuration * 60);
        this.pager.count = this.test.questions.length;
        this.timer = setInterval(() => {
            this.tick();
        }, 1000);
        this.duration = this.parseTime(this.config.duration);
    }

    tick() {
        const now = new Date();
        const diff = (now.getTime() - this.startTime.getTime()) / 1000;
        if (diff >= this.config.duration) {
            this.onSubmit();
        }
        this.ellapsedTime = this.parseTime(diff);
    }

    parseTime(totalSeconds: number) {
        let mins: string | number = Math.floor(totalSeconds / 60);
        let secs: string | number = Math.round(totalSeconds % 60);
        mins = (mins < 10 ? "0" : "") + mins;
        secs = (secs < 10 ? "0" : "") + secs;
        return `${mins}:${secs}`;
    }

    get filteredQuestions() {
        return this.test.questions
            ? this.test.questions.slice(
                this.pager.index,
                this.pager.index + this.pager.size
            )
            : [];
    }

    onSelect(question: Question, option: Option) {
        if (question.questionTypeId === this.questionTypeID) {
            console.log('inside if');
            question.answered = this.isAnswered(question);
            question.options.forEach(x => {
                if (x.optionId !== option.optionId) x.selected = false;
                if(x.selected) {
                this.answerData.push({
                    "optionId": x.optionId,
                    "selected": x.selected,
                    "answered": question.answered,
                    "questionId": question.questionId
                })
            }
            });
            console.log('ans', this.answerData);
        }
        // once selected the option move to next question automatically
        if (this.config.autoMove) {
            this.goTo(this.pager.index + 1);
        }
    }

    goTo(index: number) {
        if (index >= 0 && index < this.pager.count) {
            this.pager.index = index;
        }
    }

    isAnswered(question: Question) {
        return question.options.find(x => x.selected) ? true : false;
    }

    isCorrect(question: Question) {
        return question.options.every(x => x.selected === x.isAnswer)
            ? "correct"
            : "wrong";
    }

    onSubmit() {
        let answers = [];
        console.log('ques', this.test.questions);
        this.test.questions.forEach(x => {
            if (x.answered) {
                x.options.forEach(y => {
                    if (y.selected) {
                        answers.push({
                            quizId: this.test.id,
                            questionId: x.questionId,
                            answered: x.answered,
                            optionId: y.optionId,
                            selected: y.selected,
                        })
                    }
                })
            } else {
                answers.push({
                    quizId: this.test.id,
                    questionId: x.questionId,
                    answered: x.answered,
                    optionId: null,
                    selected: false,
                })
            }
        });
    }

    loadQues() {
        var result = this.testService.getResponse();
        var i = 0;
        let questions = [];
        let options = [];
        if (result.length !== 0 && result !== undefined && result !== null) {
            for(let k = 0; k < result.length; k++) {
                const _currQID = result[k].QuestionId;
                const _nxtQID = (result[k+1] !== undefined) ? result[k+1].QuestionId : '';
                if (result[k + 1] !== undefined && _currQID === _nxtQID) {
                    options.push({
                        "id": result[k].AnswerId,
                        "questionId": result[k].QuestionId,
                        "name": result[k].OptionName.toString(),
                        "isAnswer": result[k].IsAnswer,
                        "selected": false
                    })
                } else if (_currQID !== _nxtQID) {
                    options.push({
                        "id": result[k].AnswerId,
                        "questionId": result[k].QuestionId,
                        "name": result[k].OptionName.toString(),
                        "isAnswer": result[k].IsAnswer,
                        "selected": false
                    })
                    questions.push({
                        "id": result[k].QuestionId,
                        "name": result[k].QuestionDetails,
                        "questionTypeId": result[k].questiontype,
                        "options": options,
                        "answered": false,
                        "questionType": {
                            "id": 1,
                            "name": "Multiple Choice",
                            "isActive": true
                        }
                    });
                    options = [];
                } 
            }
            this.testName = result[i].TestName;
            this.subjectcName = (result[i].SubjectId === 2) ? 'English' : 'Science';
            this.totalMarks = result[i].totalmarks;
            this.questionTypeID = result[i].questiontype;
            this.totalDuration = result[i].totalduration;
            this.data = {
                "id": result[i].RowId,
                "name": result[i].TestName,
                "description": result[i].TestDescription,
                "questions": questions
            }
            console.log('res', result);
        }
    }

}
