export class Option {
    optionId: number;
    questionId: number;
    optionName: string;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.optionId = data.id;
        this.questionId = data.questionId;
        this.optionName = data.name;
        this.isAnswer = data.isAnswer;
        this.selected = data.selected;
    }
}
