import { optionsChar } from "../../constants/constants";

const Question = ({ questionId, updateAnswer, questions }) => {

    const currentQuestion = questions[questionId];

    const optionArr = currentQuestion?.optionsArr;



    return (
        <div className='a-question'>
            <div className="question-h">
                <p>{currentQuestion?.question.replaceAll(`&quot`, `'`).replaceAll(';', '').replaceAll('&#039;', `'`).replaceAll('&#039', `'`)}</p>
            </div>
            {
                optionsChar.map((o, index) => {
                    return (
                        <div key={index} className="options-h">
                            <button
                                onClick={(e) => updateAnswer(e.target.name)}
                                name={o}
                                className={currentQuestion?.selectedAnswer?.toUpperCase() === o?.toUpperCase() ? `options-selected-btn` : `options-btn`}>
                                <div className='options-char'><p>{o}</p>
                                </div>
                                <div className='options-optn'><p>{optionArr[index]}</p></div></button>
                        </div>
                    )
                })
            }

        </div>
    )
}
export default Question;