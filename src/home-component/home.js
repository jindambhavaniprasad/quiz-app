import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Animation from '../animation'
import { categories, categoryValue, url } from '../constants/constants';

const Home = () => {
    const history = useHistory();

    localStorage.clear();
    
    const [state, setState] = useState({
        name: '',
        option: '',
        animation: false
    })
    
    const fetchQuestions = async (e) => {
        e.preventDefault();
        document.querySelector('.animation-div').style.display='flex';
        const data = await axios.get(`${url}${state.option === 'any' ? '' : state.option + '&'}type=multiple`).then((res) => res.data.results);
        var questionsData = [];
        for (var i = 0; i < data.length; i++) {
            data[i].id = i;
            var arr = [
                data[i].correct_answer.replaceAll(`&quot`, `'`).replaceAll(';', '').replaceAll('&#039', `'`),
                data[i].incorrect_answers[0].replaceAll(`&quot`, `'`).replaceAll(';', '').replaceAll('&#039', `'`), 
                data[i].incorrect_answers[1].replaceAll(`&quot`, `'`).replaceAll(';', '').replaceAll('&#039', `'`), 
                data[i].incorrect_answers[2].replaceAll(`&quot`, `'`).replaceAll(';', '').replaceAll('&#039', `'`)
            ]
            data[i].isAnswered = false;
            data[i].selectedAnswer = null;
            data[i].optionsArr = shuffle(arr);
            questionsData.push(data[i]);
        }
        localStorage.setItem('questions', JSON.stringify(questionsData));
        localStorage.setItem('user', JSON.stringify(state.name));
        history.push('/quiz')
    }

    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    const Options = () => {
        return (
            <select name='type' className='select-optn' value={state.option} onChange={(e) => { setState({ ...state, option: e.target.value }) }}>
                {
                    categories.map((c, index) => {
                        return (
                            <option key={index} value={categoryValue[index]}>{c}</option>
                        )
                    })
                }
            </select>
        )
    }

    return (
        <div className='container'>
            <div className='heading'>
                Quiz Game
            </div>
            <form className='form-input' onSubmit={fetchQuestions}>
                <input type="text" className="input-name" required placeholder="Your Name" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
                <Options />
                <button className='action-buttons' type="submit">Play</button>
            </form>
            <button className="scores-btn" onClick={() => history.push('/scores')}>Scores</button>
            <Animation />
        </div>
    )
}
export default Home;