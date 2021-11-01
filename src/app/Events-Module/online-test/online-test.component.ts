import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { TestConfig } from 'src/app/Helper-Module/testconfig';
import { Test } from 'src/app/Helper-Module/test';
import { Question } from 'src/app/Helper-Module/question';
import { Option } from 'src/app/Helper-Module/option';
import { RestAPIService } from 'src/app/Services/restAPI.service';
import { AssessmentService } from 'src/app/Services/online-test.service';
import { PathConstants } from 'src/app/Common-Module/PathConstants';
import { ResponseMessage } from 'src/app/Common-Module/Message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NavigationEnd, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { filter } from 'rxjs';
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
    isSaved: boolean;
    isSubmitted: boolean;
    @BlockUI() blockUI: NgBlockUI;
    // @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    //     console.log("Processing beforeunload...", event);
    //     // Do more processing...
    //     var msg = 'Do you want to submit ?'
    //     this.onSubmit();
    //     event.returnValue = false;
    //     event.preventDefault();
    // }
    
    constructor(private restApiService: RestAPIService, private testService: AssessmentService,
        private messageService: MessageService, private router: Router,
        private _locationStrategy: LocationStrategy) {
            this.router.events
            .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
            .subscribe(event => {
                console.log('eve', event);
              if (
                event.id === 1 &&
                event.url === event.urlAfterRedirects 
              ) {
                  console.log('if', event);
              }
            })
         }

    ngOnInit(): void {
        this.ellapsedTime = "00:00";
        this.loadQues();
        this.loadTest();
        history.pushState(null, null, location.href);
        this._locationStrategy.onPopState(() => {
            history.pushState(null, null, location.href);
        })
        // window.addEventListener("beforeunload", function (e) {
        //     var confirmationMessage = "Do you want to submit the test ?";
        //     console.log("cond", e);
        //     e.returnValue = confirmationMessage;  
        //     return e.returnValue;  
        // });
    const params = {
        'RowId': this.testService.getId()
    }
    if(this.testService.getId() !== undefined && this.testService.getId() !== null) {
    this.restApiService.put(PathConstants.OnlineAssessment_Put, params).subscribe(res => {
        if(res !== undefined && res !== null) {
            if(res) {
                console.log('visited test & updated');
            } else {
                console.log('visited test butn not updated');
            }
        }
    })
    }
}

    loadQues() {
        var result = this.testService.getQuestions();
        var i = 0;
        let questions = [];
        let options = [];
        if (result !== undefined && result !== null) {
            if (result.length !== 0) {
                for (let k = 0; k < result.length; k++) {
                    const _currQID = result[k].QuestionId;
                    const _nxtQID = (result[k + 1] !== undefined) ? result[k + 1].QuestionId : '';
                    if (result[k + 1] !== undefined && _currQID === _nxtQID) {
                        options.push({
                            "id": result[k].OptionId,
                            "questionId": result[k].QuestionId,
                            "name": result[k].OptionName.toString(),
                            "isAnswer": result[k].IsAnswer,
                            "selected": false
                        })
                    } else if (_currQID !== _nxtQID) {
                        options.push({
                            "id": result[k].OptionId,
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
                this.subjectcName = (result[i].Subject);
                this.totalMarks = result[i].totalmarks;
                this.questionTypeID = result[i].questiontype;
                this.totalDuration = result[i].totalduration;
                this.data = {
                    "id": result[i].RowId,
                    "name": result[i].TestName,
                    "description": result[i].TestDescription,
                    "questions": questions
                }
            }
        } else {
            this.data = [];
        }

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
        if (diff >= this.config.duration && !this.isSaved) {
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
            question.answered = this.isAnswered(question);
            question.options.forEach(x => {
                if (x.optionId !== option.optionId) x.selected = false;
                if (x.selected) {
                    this.answerData.push({
                        "optionId": x.optionId,
                        "selected": x.selected,
                        "answered": question.answered,
                        "questionId": question.questionId
                    })
                }
            });
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
        this.blockUI.start();
        this.isSubmitted = true;
        let answers = [];
        console.log('submit');
        if(this.test.questions !== undefined && this.test.questions !== null && this.test.questions.length !== 0) {
        this.test.questions.forEach(x => {
            if (x.answered) {
                x.options.forEach(y => {
                    if (y.selected) {
                        answers.push({
                            AnswerId: 0,
                            TestId: this.test.id,
                            QuestionId: x.questionId,
                            isAnswered: x.answered,
                            OptionId: y.optionId,
                            isSelected: y.selected,
                        })
                    }
                })
            } else {
                answers.push({
                    AnswerId: 0,
                    TestId: this.test.id,
                    QuestionId: x.questionId,
                    isAnswered: x.answered,
                    OptionId: 0, //no question answered
                    isSelected: false, //answer is not selected
                })
            }
        });
    } else {
        this.test.questions = [];
    }
        this.restApiService.post(PathConstants.OnlineAssessment_Asnwer_Post, answers).subscribe(res => {
            if (res) {
                this.blockUI.stop();
                this.isSaved = true;
                answers = [];
                this.test = new Test(null);
                this.messageService.clear();
                this.messageService.add({
                    key: 't-msg', severity: ResponseMessage.SEVERITY_SUCCESS,
                    summary: ResponseMessage.SUMMARY_SUCCESS, detail: ResponseMessage.SubmitMessage
                });
                this.router.navigate(['/online-assessment']);
            } else {
                this.isSaved = false;
                this.isSubmitted = false;
                this.blockUI.stop();
                this.messageService.clear();
                this.messageService.add({
                    key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
                    summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
                });
            }
        }, (err: HttpErrorResponse) => {
            this.isSaved = false;
            this.isSubmitted = false;
            this.blockUI.stop();
            if (err.status === 0 || err.status === 400) {
                this.messageService.clear();
                this.messageService.add({
                    key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
                    summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
                })
            }
        })
    }

    onViewResult() { }
}
