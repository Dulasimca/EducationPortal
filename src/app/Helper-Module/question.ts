import { Option } from './option';

export class Question {
    questionId: number;
    questionName: string;
    questionTypeId: any;
    options: Option[];
    answered: boolean;

    constructor(data: any) {
        data = data || {};
        this.questionId = data.id;
        this.questionName = data.name;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
