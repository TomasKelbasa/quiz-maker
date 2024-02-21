import { createContext, useReducer, useState } from "react";
import { act } from "react-dom/test-utils";

export type QuizType = {
    questions: QuestionType[];
}

export type OptionType = {
    text: string;
    isCorrect: boolean;
};

export type QuestionType = {
    text: string;
    options: OptionType[];
};

type QuizContextType = {
    quiz: QuizType,
    reducerAction: React.Dispatch<Action>
}

const defaultQuiz:QuizType = {
    questions: []
}

export const QuizContext = createContext<QuizContextType>({quiz: defaultQuiz, reducerAction: () => {}});

export enum actionType {  
    ADD_QUESTION,
    ADD_OPTION,
    CLEAR_QUIZ,
    REMOVE_OPTION,
    REMOVE_QUESTION,
    SWITCH_CORRECT_OPTION
}

export type Action =
    {
        type: actionType.CLEAR_QUIZ
    }|{
        type: actionType.ADD_QUESTION,
        text: string
    }|{
        type: actionType.ADD_OPTION,
        text: string,
        index: number
    }|{
        type: actionType.REMOVE_OPTION,
        questionIndex: number,
        optionIndex: number
    }|{
        type: actionType.REMOVE_QUESTION,
        index: number
    }|{
        type: actionType.SWITCH_CORRECT_OPTION,
        questionIndex: number,
        optionIndex: number,
        value: boolean
    }

export type QuizReducerType = (state: QuizType, action:Action) => QuizType;

const quizReducer:QuizReducerType = (state, action) => {
    switch(action.type){
        case actionType.CLEAR_QUIZ:
            return defaultQuiz;
        case actionType.ADD_QUESTION:
            return {
                questions: [...state.questions, {text: action.text, options: []}]
            };
        case actionType.ADD_OPTION:
            return {
                questions: state.questions.map((q, ix) => {
                    if(ix === action.index){
                        return {
                            text: q.text,
                            options: [...q.options, {text: action.text, isCorrect: false}]
                        }
                    } else return q;
                })
            };
        case actionType.REMOVE_OPTION:
            return {
                questions: state.questions.map((q, ix) => {
                    if(ix === action.questionIndex){
                        return {
                            text: q.text,
                            options: q.options.filter((o, i) => i !== action.optionIndex)
                        }
                    } else return q;
                })
            };
        case actionType.REMOVE_QUESTION:
            return {
                questions: state.questions.filter((q, ix) => ix !== action.index)
            }
        case actionType.SWITCH_CORRECT_OPTION:
            return {
                questions: state.questions.map((q, ix) => {
                    if(ix === action.questionIndex){
                        return {
                            text: q.text,
                            options: q.options.map((o, i) => {
                                if(i !== action.optionIndex) return o;
                                else return {text: o.text, isCorrect: action.value}
                            })
                        }
                    } else return q;
                })
            };
        default:
            console.log("wrong reducer action");
            return state;
    }
}

export const QuizProvider: React.FC<React.PropsWithChildren> = ({children}) => {

    const[quiz, dispatch] = useReducer<QuizReducerType>(quizReducer, defaultQuiz);

    return(
        <QuizContext.Provider value={{quiz:quiz, reducerAction:dispatch}}>
            {children}
        </QuizContext.Provider>
    );
}

export default QuizProvider;