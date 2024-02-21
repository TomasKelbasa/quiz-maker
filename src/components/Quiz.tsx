import { useContext, useRef } from "react";
import { QuizContext, actionType } from "../providers/QuizProvider";
import { QuizQuestion } from "./QuizQuestion";
import styles from "./Quiz.module.css";

export const Quiz: React.FC = () => {

    const qContext = useContext(QuizContext);

    const input = useRef<HTMLInputElement>(null);

    const handleAddQuestion = () => {
        const t = input.current?.value;
        if(t && t.length > 0) qContext.reducerAction({type: actionType.ADD_QUESTION, text: t});
    }
    
    const handleRemoveAll = () => {
        qContext.reducerAction({type: actionType.CLEAR_QUIZ});
    }

    return(
        <div>
            <div className={styles["options-box"]}>
                <h1>React Quiz</h1>
                <div className={styles["add-question-cont"]}>
                    <input ref={input} type="text" />
                    <button onClick={() => handleAddQuestion()}>Add question</button>
                </div>
                <button className={styles["btn--danger"]} onClick={() => handleRemoveAll()}>Clear</button>
            </div>
            <div className={styles["question-box"]}>
                {qContext.quiz.questions.map((question, index) => (<QuizQuestion key={index} questionIndex={index}/>))}
            </div>
        </div>
    );
};

export default Quiz;