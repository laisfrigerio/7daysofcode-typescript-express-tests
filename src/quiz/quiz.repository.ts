// Repository is the layer responsible for interacting with the database.
// In this exercice, we will use an in-memory database to store the quizzes.
import { quizzes, IQuiz, IQuestion, IQuestionUpdate } from "./quiz.model";

export const getQuizzesRepository = (): IQuiz[] => quizzes;

export const createQuizRepository = (questions: IQuestion[]) => {
  quizzes.push({ id: quizzes.length + 1, questions });
};

export const getQuizByIdRepository = (id: number): IQuiz | undefined => {
  return quizzes.find((quiz) => quiz.id === id);
};

export const getQuestionsByCategoryRepository = (
  category: string
): IQuestion[] => {
  return quizzes.flatMap((quiz) =>
    quiz.questions.filter((question) => question.category === category)
  );
};

export const getQuestionByIdRepository = (
  quiz: IQuiz,
  questionId: number
): IQuestion | undefined => {
  return quiz.questions.find(
    (question: IQuestion) => question.id === questionId
  );
};

export const getQuizIndexRepository = (quizId: number): false | number => {
  const quizIndex = quizzes.findIndex((quiz) => quiz.id === quizId);

  if (quizIndex === -1) {
    return false;
  }

  return quizIndex;
};

export const getQuestionIndexRepository = (
  quiz: IQuiz,
  questionId: number
): false | number => {
  const questionIndex = quiz.questions.findIndex(
    (question) => question.id === questionId
  );

  if (questionIndex === -1) {
    return false;
  }

  return questionIndex;
};

export const updateQuizQuestionRepository = (
  quiz: IQuiz,
  question: IQuestion,
  questionUpdate: IQuestionUpdate
): boolean => {
  // Itera sobre as chaves do objeto questionUpdate
  (Object.keys(questionUpdate) as (keyof IQuestionUpdate)[]).forEach((key) => {
    if (questionUpdate[key] !== undefined) {
      (question as any)[key] = questionUpdate[key];
    }
  });

  return true;
};

export const deleteQuizRepository = (quizIndex: number): void => {
  quizzes.splice(quizIndex, 1);
};

export const deleteQuestionFromQuizRepository = (
  quiz: IQuiz,
  questionIndex: number
): void => {
  quiz.questions.splice(questionIndex, 1);
};
