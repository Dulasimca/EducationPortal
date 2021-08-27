import { Question } from "./question";
import { TestConfig } from "./testconfig";

export class Test {
    id: number;
    name: string;
    description: string;
    config: TestConfig;
    questions: Question[];

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.config = new TestConfig(data.config);
            this.questions = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}
