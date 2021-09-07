import { Component, OnInit } from '@angular/core';
import { TestConfig } from 'src/app/Helper-Module/testconfig';
import { Test } from 'src/app/Helper-Module/test';
import { Question } from 'src/app/Helper-Module/question';
import { Option } from 'src/app/Helper-Module/option';
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
  timer: any = null;
  startTime: Date = new Date();
  endTime: Date;
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
  constructor() { }

  ngOnInit(): void {
    this.testName = 'Mid Term Test';
    this.subjectcName = 'English';
    this.totalMarks = 50;
    this.ellapsedTime = "00:00";
    this.loadQues();
    this.loadTest();
  }

  loadTest() {
    this.test = new Test(this.data);
    console.log('test', this.test);
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
    if (question.questionTypeId === 1) {
      question.options.forEach(x => {
        if (x.optionId !== option.optionId) x.selected = false;
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
    return question.options.find(x => x.selected) ? "Answered" : "Not Answered";
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer)
      ? "correct"
      : "wrong";
  }

  onSubmit() {
    let answers = [];
    this.test.questions.forEach(x =>
      answers.push({
        quizId: this.test.id,
        questionId: x.questionId,
        answered: x.answered
      })
    );
    }

  loadQues() {
    this.data = {
       "id": 1,
      "name": "English Test",
      "description": "English Test (Basic Multiple Choice Questions for Synonyms)",
      "questions": [
          {
              "id": 1010,
              "name": "……………… and I do claim to represent him in all his “ruggedness”.",
              "questionTypeId": 1,
              "options": [
                  {
                      "id": 1055,
                      "questionId": 1010,
                      "name": "toughness",
                      "isAnswer": true
                  },
                  {
                      "id": 1056,
                      "questionId": 1010,
                      "name": "weakness",
                      "isAnswer": false
                  },
                  {
                      "id": 1057,
                      "questionId": 1010,
                      "name": "brightness",
                      "isAnswer": false
                  },
                  {
                      "id": 1058,
                      "questionId": 1010,
                      "name": "seriousness",
                      "isAnswer": false
                  }
              ],
              "questionType": {
                  "id": 1,
                  "name": "Multiple Choice",
                  "isActive": true
              }
          },
          {
              "id": 1011,
              "name": "………………that we regard a man who does not possess it as “eccentric”.",
              "questionTypeId": 1,
              "options": [
                  {
                      "id": 1055,
                      "questionId": 1011,
                      "name": "modem",
                      "isAnswer": false
                  },
                  {
                      "id": 1057,
                      "questionId": 1011,
                      "name": "weary",
                      "isAnswer": false
                  },
                  {
                      "id": 1056,
                      "questionId": 1011,
                      "name": "normal",
                      "isAnswer": false
                  },
                  {
                      "id": 1058,
                      "questionId": 1011,
                      "name": "weird",
                      "isAnswer": true
                  }
              ],
              "questionType": {
                  "id": 1,
                  "name": "Multiple Choice",
                  "isActive": true
              }
          },
          {
              "id": 1012,
              "name": "The greatest disadvantage for me was my loss of “appetite”.",
              "questionTypeId": 1,
              "options": [
                  {
                      "id": 1055,
                      "questionId": 1012,
                      "name": "hope",
                      "isAnswer": false
                  },
                  {
                      "id": 1057,
                      "questionId": 1012,
                      "name": "memory",
                      "isAnswer": false
                  },
                  {
                      "id": 1056,
                      "questionId": 1012,
                      "name": "alertness",
                      "isAnswer": false
                  },
                  {
                      "id": 1058,
                      "questionId": 1012,
                      "name": "hunger",
                      "isAnswer": true
                  }
              ],
              "questionType": {
                  "id": 1,
                  "name": "Multiple Choice",
                  "isActive": true
              }
          },
          {
              "id": 1013,
              "name": "Her happiest moments were with her sparrows whom she fed with “frivolous” rebukes,",
              "questionTypeId": 1,
              "options": [
                  {
                      "id": 1055,
                      "questionId": 1013,
                      "name": "serious",
                      "isAnswer": true
                  },
                  {
                      "id": 1057,
                      "questionId": 1013,
                      "name": "funny",
                      "isAnswer": false
                  },
                  {
                      "id": 1056,
                      "questionId": 1013,
                      "name": "decent",
                      "isAnswer": false
                  },
                  {
                      "id": 1058,
                      "questionId": 1013,
                      "name": "harmless",
                      "isAnswer": false
                  }
              ],
              "questionType": {
                  "id": 1,
                  "name": "Multiple Choice",
                  "isActive": true
              }
          },
          {
              "id": 1014,
              "name": "There are, it must be “admitted”, some matters…………",
              "questionTypeId": 1,
              "options": [
                  {
                      "id": 1055,
                      "questionId": 1014,
                      "name": "replied",
                      "isAnswer": false
                  },
                  {
                      "id": 1057,
                      "questionId": 1014,
                      "name": "denied",
                      "isAnswer": true
                  },
                  {
                      "id": 1056,
                      "questionId": 1014,
                      "name": "argued",
                      "isAnswer": false
                  },
                  {
                      "id": 1058,
                      "questionId": 1014,
                      "name": "accepted",
                      "isAnswer": false
                  }
              ],
              "questionType": {
                  "id": 1,
                  "name": "Multiple Choice",
                  "isActive": true
              }
          },
          {
              "id": 1015,
              "name": "“Don’t look so “doleful”, girls.”",
              "questionTypeId": 1,
              "options": [
                  {
                      "id": 1055,
                      "questionId": 1015,
                      "name": "peaceful",
                      "isAnswer": false
                  },
                  {
                      "id": 1057,
                      "questionId": 1015,
                      "name": "powerful",
                      "isAnswer": false
                  },
                  {
                      "id": 1056,
                      "questionId": 1015,
                      "name": "joyful",
                      "isAnswer": true
                  },
                  {
                      "id": 1058,
                      "questionId": 1015,
                      "name": "doubtful",
                      "isAnswer": false
                  }
              ],
              "questionType": {
                  "id": 1,
                  "name": "Multiple Choice",
                  "isActive": true
              }
          },
          {
              "id": 1016,
              "name": "Select the correct expansion of “HDTV”.",
              "questionTypeId": 1,
              "options": [
                  {
                      "id": 1055,
                      "questionId": 1016,
                      "name": "Heavy Dielectric Television",
                      "isAnswer": false
                  },
                  {
                      "id": 1056,
                      "questionId": 1016,
                      "name": " High Definition Television",
                      "isAnswer": true
                  },
                  {
                      "id": 1057,
                      "questionId": 1016,
                      "name": "Heavy Distributory Television",
                      "isAnswer": false
                  },
                  {
                      "id": 1058,
                      "questionId": 1016,
                      "name": "Highly Decentralized Television",
                      "isAnswer": false
                  }
              ],
              "questionType": {
                  "id": 1,
                  "name": "Multiple Choice",
                  "isActive": true
              }
          },
          {
              "id": 1017,
              "name": "Choose the suitable option to pair it with the word “mantel” to form a compound word",
              "questionTypeId": 1,
              "options": [
                  {
                      "id": 1055,
                      "questionId": 1017,
                      "name": "picture",
                      "isAnswer": false
                  },
                  {
                      "id": 1056,
                      "questionId": 1017,
                      "name": "piece",
                      "isAnswer": true
                  },
                  {
                      "id": 1057,
                      "questionId": 1017,
                      "name": "cover",
                      "isAnswer": false
                  },
                  {
                      "id": 1058,
                      "questionId": 1017,
                      "name": "cloth",
                      "isAnswer": false
                  }
              ],
              "questionType": {
                  "id": 1,
                  "name": "Multiple Choice",
                  "isActive": true
              }
          },
          {
              "id": 1018,
              "name": "Form a derivative by adding the right suffix to the word “regular”,",
              "questionTypeId": 1,
              "options": [
                  {
                      "id": 1055,
                      "questionId": 1018,
                      "name": "-fill",
                      "isAnswer": false
                  },
                  {
                      "id": 1057,
                      "questionId": 1018,
                      "name": "-able",
                      "isAnswer": false
                  },
                  {
                      "id": 1056,
                      "questionId": 1018,
                      "name": " -ity",
                      "isAnswer": true
                  },
                  {
                      "id": 1058,
                      "questionId": 1018,
                      "name": "-ance",
                      "isAnswer": false
                  }
              ],
              "questionType": {
                  "id": 1,
                  "name": "Multiple Choice",
                  "isActive": true
              }
          },
          {
              "id": 1019,
              "name": "Choose the meaning of the foreign word in the sentence. Nalini is a “bonafide” student of the Madras University.",
              "questionTypeId": 1,
              "options": [
                  {
                      "id": 1055,
                      "questionId": 1019,
                      "name": "genuine",
                      "isAnswer": true
                  },
                  {
                      "id": 1056,
                      "questionId": 1019,
                      "name": "punctual",
                      "isAnswer": false
                  },
                  {
                      "id": 1057,
                      "questionId": 1019,
                      "name": "brilliant",
                      "isAnswer": false
                  },
                  {
                      "id": 1058,
                      "questionId": 1019,
                      "name": "confident",
                      "isAnswer": false
                  }
              ],
              "questionType": {
                  "id": 1,
                  "name": "Multiple Choice",
                  "isActive": true
              }
          }
      ]
    };
  }
}
