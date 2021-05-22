import Numbers from "./numbers-component/numbers"
import Question from "./question/question"
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../firebase'
import { optionsChar } from "../constants/constants"
import Animation from '../animation'

const Questions = () => {

    const history = useHistory();

    var questions = JSON.parse(localStorage.getItem('questions'));

    var userName = JSON.parse(localStorage.getItem('user'));

    const [selected, setSelected] = useState({
        id: 0,
        questions: questions,
        isAnswerdSize: 0
    });

    const updateAnswer = (answer) => {
        var qs = selected.questions;
        qs[selected.id].isAnswered = true;
        qs[selected.id].selectedAnswer = answer;
        setSelected({ ...selected, questions: qs })
    }

    const updateQuestion = (n) => {
        setSelected({ ...selected, id: n })
    }

    const pushScoretoDB = (score) => {
        var user = {
            name: userName,
            date: String(new Date().getDate() + ' ' + String(new Date()).split(' ')[1] + ', ' + new Date().getFullYear()),
            score: score
        };
        localStorage.setItem('user', JSON.stringify(user));
        firebase.database().ref('highscores').push(user).then(() => {
            document.querySelector('.animation-div').style.display='none';
            history.push('/thankyou')
        })
    }

    const submitScore = () => {
        document.querySelector('.animation-div').style.display='flex';
        var answeredArr = [];
        var score = 0;
        selected.questions.forEach(q => {
            if (q?.isAnswered) answeredArr.push(true)
            if (optionsChar.indexOf(q?.selectedAnswer) === q?.optionsArr.indexOf(q?.correct_answer)) {
                score = score + 1;
            }
        });
        if (answeredArr.length === questions.length) {
            pushScoretoDB(score);
        } else {
            document.querySelector('.animation-div').style.display='none';
            alert('Please Answer All The Questions')
        }
    }

    return (
        <div className='questions-parent'>
            <div className='welcome-text'>Welcome, {userName}</div>
            <div className='questions-number'>
                <Numbers id={selected.id} updateQuestion={updateQuestion} number={questions?.length} />
            </div>
            <Question questionId={selected.id} updateAnswer={updateAnswer} questions={selected.questions} />
            <div className='submit-div'>
                <button className='submit-btn' onClick={submitScore}>
                    Submit
                </button>
            </div>
            <Animation/>
        </div>
    )
}
export default Questions;