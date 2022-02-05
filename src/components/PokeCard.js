import React from 'react';
import Check from '../assets/check.png';

function pokeCard(props) {
    const { pokePic, pokeName, found } = props;
    let check = null;
    if (found) check = <img src={Check} alt='check' className='found-check'></img>;
    return (
        <div className='poke-card'>
            {check}
            <img src={pokePic} alt={pokeName} className='poke-pic'></img>
            <h3 className='poke-name'>{pokeName}</h3>
        </div>
    );
}

export default pokeCard;
