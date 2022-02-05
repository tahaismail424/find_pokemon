import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pokeLogo from './assets/pokemon_logo.png'

//pokemon black and white font provided by https://www.deviantart.com/mauriziovit/art/Pokemon-Black-and-White-Version-Font-291005220

function Start() {
  let [name, setName] = useState('');
  const updateName = (e) => {
    setName(e.target.value);
  }

  return (
    <div>
      <h1>Let's find </h1>
      <img src={pokeLogo} alt='pokeLogo' className='poke-logo'></img>
      <label htmlFor='pname'></label>
      <input type='text' id='pname' name='pname' value={name} onChange={updateName}></input>
        <Link 
          to={{
            pathname: '/game',
            state: { name }
        }}
          className='start-link'>Enter your name above and click to start</Link>
        <h2>How to play: </h2>
        <ul>
          <li>You'll be asked to find 5 different Pokémon in a picture</li>
          <li>Click where you think you've found one and select which Pokémon it is</li>
          <li>You'll be told whether you're right or wrong</li>
          <li>Keep playing until you find all 5. Quick! You're being timed!</li>
        </ul>
    </div>
  );
}

export default Start;
