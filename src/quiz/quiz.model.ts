export interface IQuestion {
  id: number;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export interface IQuestionUpdate {
  category?: string;
  type?: string;
  difficulty?: string;
  question?: string;
  correctAnswer?: string;
  incorrectAnswers?: string[];
}

export interface IQuestionUpdateWithId extends IQuestionUpdate {
  id: number;
}

export interface IQuiz {
  id: number;
  questions: IQuestion[];
}

export const quizzes: IQuiz[] = [];
