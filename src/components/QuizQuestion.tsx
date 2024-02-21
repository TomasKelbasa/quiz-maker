import { useContext, useRef } from "react";
import { QuizContext, actionType } from "../providers/QuizProvider";
import { QuizOption } from "./QuizOption";
import styles from "./QuizQuestion.module.css";


interface IQuizQuestionProps {
    questionIndex: number
}

export const QuizQuestion: React.FC<IQuizQuestionProps> = ({questionIndex}) => {

    const qContext = useContext(QuizContext);

    const newOptionInput = useRef<HTMLInputElement>(null);

    const handleRemoveQuestion = () => {
        qContext.reducerAction({type: actionType.REMOVE_QUESTION, index: questionIndex});
    }

    const handleAddOption = () => {
        const t = newOptionInput?.current?.value;
        if(t && t.length > 0) qContext.reducerAction({type: actionType.ADD_OPTION, index: questionIndex, text: t});
    }
    
    return(
        <div>
            <p className={styles["question__text"]}>
                <span>
                    <button onClick={() => handleRemoveQuestion()}>-</button>
                </span>
                {qContext.quiz.questions[questionIndex].text}
            </p>
            <div className={styles["question__settings"]}>
                <input ref={newOptionInput} type="text" />
                <button onClick={() => handleAddOption()}>+</button>
            </div>
            <ul className={styles["question__options"]}>
                {qContext.quiz.questions[questionIndex].options.map((option, index) => (<QuizOption key={index} questionIndex={questionIndex} optionIndex={index}/>))}
            </ul>
        </div>
    );
}