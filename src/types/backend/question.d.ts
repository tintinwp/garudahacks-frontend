export interface Question {
  id: string;
  questionOrder: number;
  type: QuestionType;
  questionAnswer: string;
  questionImage: string;
}

type QuestionType = "IMAGE"  | 'TEXT' | 'IMAGE_2'