import React from 'react';

function ScoreCard(props) {
    const { pName, pScore } = props;
    return (
        <div className='score-card'>
            <h5 className='score-name'>{pName}</h5>
            <h5 className='score-time'>{pScore}</h5>
        </div>
    )
}

export default ScoreCard;
