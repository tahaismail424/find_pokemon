import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { getScores, updateScores } from './firebase';
import ScoreCard from './components/ScoreCard'; 
import _ from 'lodash';
import msToTime from './displayTime';

function End() {

    const history = useHistory();
    let [curScores, setCurScores] = useState([])
    let [timeDisplay, setTimeDisplay] = useState('');
    let [highScoreMessage, setHighScoreMessage] = useState(null);
  
    useEffect(() => {
        const getData = async () => {
            const elapsedTime = history.location.state.time;
            const playerName = history.location.state.name;
            const displayTime = msToTime(elapsedTime)
            const playerScore = { displayTime: displayTime, name: playerName, rawTime: elapsedTime }
            const prev = await getScores();
            const cur = updateScores(playerScore, prev);
            const message = (_.isEqual(prev, cur)) ? null :
            <h3>Congratulations! Your time was quick enough to make the high score board!</h3>
            setCurScores(cur);
            setTimeDisplay(displayTime);
            setHighScoreMessage(message);
        }
        getData();
    }, []);

   
    return (
        <div>
            <h2>You found all the Pokemon in 
                {' ' + timeDisplay.slice(0, timeDisplay.indexOf(':')) + ' '} 
                minutes and 
                {' ' + timeDisplay.slice(timeDisplay.indexOf(':') + 1)} seconds!</h2>
            {highScoreMessage}
            <h3 className='score-intro'>High Scores: </h3>
            <div className='score-table'>
            {curScores.map((scoreCard, index) => 
                <ScoreCard 
                    pName={scoreCard.name} 
                    pScore={scoreCard.displayTime}>
                    key={index}
                    </ScoreCard>)}
            </div>
            
            <Link to={{
                pathname: '/'
                }}
                className='again-link'>Click to play again</Link>
        </div>
    )
}



export default End;
