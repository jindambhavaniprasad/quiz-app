import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import firebase from '../firebase'

const Result = () => {

    const [scores, setScores] = useState([]);

    const history = useHistory();

    useEffect(()=> {
        firebase.database().ref('highscores').on('value',datasnap => {
            console.log(datasnap.val());
            const response = datasnap.val();
            var sc = [];
            for (const key in response) {
                if (Object.hasOwnProperty.call(response, key)) {
                    sc.push(response[key])
                }
            }
            setScores(sc);
        })
    },[])

    return(
        <div className='scores-container'>
           <div className='scores-header'><button onClick={()=> {
                history.push('/');
            }}>V</button><p className='scores-text'> High Scores</p></div>
           <div className='scores-parent-div'>
               {
                   scores?.map((s,index)=> {
                       return(
                           <div key={index} className='score-div'>
                               <p>{index+1}. <bold>{s.name}</bold> scored <bold>{s.score}</bold> on {s.date}</p>
                            </div>
                       )
                   })
               }
           </div>
        </div>
    )

}
export default Result;