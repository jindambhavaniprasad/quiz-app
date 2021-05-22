import { useHistory } from "react-router";

const ThankYou = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const history= useHistory();

    return(
        <div className='thankyou-div'>
            <div className="score-txt">
                <span>Your Score is {user?.score}</span>
            </div>
            <button className='redirect-home-btn' onClick={()=> {
                localStorage.clear();
                history.push('/');
            }}>Home</button>
        </div>
    )

}
export default ThankYou;