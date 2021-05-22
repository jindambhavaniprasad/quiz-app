import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './home-component/home';
import Questions from './questions-component/questions';
import Result from './result-component/result';
import ThankYou from './questions-component/thankyou-component/thankyou';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/quiz" exact component={Questions}/>
      <Route path="/scores" exact component={Result}/>
      <Route path="/thankyou" exact component={ThankYou}/>
    </BrowserRouter>
  );
}

export default App;
