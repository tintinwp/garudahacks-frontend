import { Question, QuestionType } from '@/types/backend/question';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const QUESTION_TYPE: QuestionType[] = ['IMAGE', 'TEXT', 'IMAGE_2']

export type SliceList = 'dark' | 'light';
export type SliceState = {
  questions: Question[]
  question: Question | undefined
  questionIndex: number
  correctAnswer: number
  questionFinish: boolean;
};

const initialState: SliceState = {
  questionIndex: 0,
  questions: [],
  question: undefined,
  correctAnswer: 0,
  questionFinish: false
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    resetQuestionState(state) {
      state.questionIndex = 0;
      state.correctAnswer = 0
      state.questionFinish = false;
    },
    setQuestions(state, action: PayloadAction<Question[]>) {
      action.payload = action.payload.slice(0, 3);
      for(const question of action.payload) {
        const randomQuestionType = QUESTION_TYPE[Math.floor(Math.random() * QUESTION_TYPE.length)]
        question.type = randomQuestionType 
      }
      state.questions = action.payload;
      state.questionIndex = 0;
      state.question = action.payload[0];
      state.correctAnswer = 0
      state.questionFinish = false;
    },
    nextQuestion(state, action: PayloadAction<boolean>) {
      if(action.payload) {
        state.correctAnswer += 1
      }
      if(state.questionIndex + 1 === state.questions.length) {
        state.questionFinish = true;
      }
      state.questionIndex += 1
      state.question = state.questions[state.questionIndex]
      if(state.question) { 
        console.log('Answer : ', state.question.questionAnswer)
      }
    }
  },
});

export const { nextQuestion, setQuestions, resetQuestionState } = slice.actions;
const sliceReducer = slice.reducer;
export default sliceReducer;
