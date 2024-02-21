import { useContext } from "react";
import { QuizContext, actionType } from "../providers/QuizProvider";
import styles from "./QuizOption.module.css";


interface IQuizOption {
    questionIndex: number,
    optionIndex: number
}

export const QuizOption: React.FC<IQuizOption> = ({questionIndex, optionIndex}) => {

    const qContext = useContext(QuizContext);
    const optionData = qContext.quiz.questions[questionIndex].options[optionIndex];

    const handleOptionRemove = () => {
        qContext.reducerAction({type: actionType.REMOVE_OPTION, optionIndex: optionIndex, questionIndex: questionIndex});
    }

    const handleOptionSwitch = () => {
        qContext.reducerAction({type: actionType.SWITCH_CORRECT_OPTION, questionIndex: questionIndex, optionIndex: optionIndex, value: !optionData.isCorrect})
    }
    
    
    return(
        <li>
            <div className={styles["option"]}>
                <button className={styles["remove-btn"]} onClick={() => handleOptionRemove()}>-</button>
                <span className={styles["option__text"] + " " + (optionData.isCorrect ? styles["correct"] : styles["incorrect"])}>{optionData.text}</span>
                <button className={styles["switch-btn"]} onClick={() => handleOptionSwitch()}>S</button>
            </div>
        </li>
    );
}