// The service layer is responsible for reaching the repository layer.
// It contains the business logic of the application.
import { fetchQuestions } from "../third-party/trivia";
import {
  IQuestion,
  IQuestionUpdate,
  IQuestionUpdateWithId,
  IQuiz,
} from "./quiz.model";
import {
  getQuizzesRepository,
  getQuizByIdRepository,
  getQuizIndexRepository,
  getQuestionByIdRepository,
  getQuestionsByCategoryRepository,
  getQuestionIndexRepository,
  createQuizRepository,
  updateQuizQuestionRepository,
  deleteQuestionFromQuizRepository,
  deleteQuizRepository,
} from "./quiz.repository";
import { NotFoundException } from "./quiz.exception";

export const getQuizzesService = () => {
  return getQuizzesRepository();
};

export const warmUpQuizService = async (): Promise<void> => {
  const questions: IQuestion[] = await fetchQuestions();
  createQuizRepository(questions);
};

export const createQuizService = async (
  questions: IQuestion[]
): Promise<void> => {
  createQuizRepository(questions);
};

export const getQuizByIdService = (quizId: number): IQuiz => {
  const quiz = getQuizByIdRepository(quizId);

  if (!quiz) {
    throw new NotFoundException("Quiz not found");
  }

  return quiz;
};

export const getQuestionsByCategoryService = (
  category: string
): IQuestion[] => {
  const questions: IQuestion[] = getQuestionsByCategoryRepository(category);

  if (questions.length > 0) {
    return questions;
  }

  throw new NotFoundException("Questions not found");
};

export const updateQuizQuestionService = (
  quizId: number,
  questionId: number,
  questionUpdate: IQuestionUpdate
): boolean => {
  const quiz = getQuizByIdRepository(quizId);

  if (!quiz) {
    throw new NotFoundException("Quiz not found");
  }

  const question = getQuestionByIdRepository(quiz, questionId);

  if (!question) {
    throw new NotFoundException("Question not found");
  }

  return updateQuizQuestionRepository(quiz, question, questionUpdate);
};

const allUpdateQuestionsExists = (
  quiz: IQuiz,
  questionsUpdate: IQuestionUpdateWithId[]
): boolean => {
  return questionsUpdate.every((questionUpdate) => {
    const question = getQuestionByIdRepository(quiz, questionUpdate.id);

    if (!question) {
      return false;
    }

    return true;
  });
};

export const updateQuizBulkService = (
  quizId: number,
  questionsUpdate: IQuestionUpdateWithId[]
): void => {
  const quiz = getQuizByIdRepository(quizId);

  if (!quiz) {
    throw new NotFoundException("Quiz not found");
  }

  const every = allUpdateQuestionsExists(quiz, questionsUpdate);

  if (!every) {
    throw new NotFoundException("At least one of the Question not exists");
  }

  questionsUpdate.forEach((questionUpdate) => {
    const question = getQuestionByIdRepository(quiz, questionUpdate.id);

    if (!question) {
      throw new NotFoundException("Question not found");
    }

    updateQuizQuestionRepository(quiz, question, questionUpdate);
  });
};

export const deleteQuizService = (quizId: number): void => {
  const quizIndex = getQuizIndexRepository(quizId);

  if (quizIndex === false) {
    throw new NotFoundException("Quiz not found");
  }

  deleteQuizRepository(quizIndex);
};

export const deleteQuestionFromQuizService = (
  quizId: number,
  questionId: number
): void => {
  const quiz = getQuizByIdRepository(quizId);

  if (!quiz) {
    throw new NotFoundException("Quiz not found");
  }

  const questionIndex: number | boolean = getQuestionIndexRepository(
    quiz,
    questionId
  );

  if (questionIndex === false) {
    throw new NotFoundException("Question not found");
  }

  deleteQuestionFromQuizRepository(quiz, questionIndex);
};
