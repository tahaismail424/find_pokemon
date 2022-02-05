import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import pokePic from './assets/pokemon_wallpaper.jpeg';
import { selectMons, getPokePics, checkFound } from './firebase';
import PokeCard from './components/PokeCard';
import PokeView from './components/PokeView';
import msToTime from './displayTime';

function Game() {
    let [foundPokes, setFoundPokes] = useState([]);
    let [pickedPokemon, setPickedPokemon] = useState([]);
    let [pokePics, setPokePics]  = useState([]);
    let [pokeCards, setPokeCards] = useState(null);
    let [boxView, setBoxView] = useState(null);
    const startTime = useRef(Date.now());
    const history = useHistory();
    const name = history.location.state.name;

    useEffect(() => {
        const getData = async () => {
            const mons = await selectMons();
            const pics = await getPokePics(mons);
            const foundArray = [    
                {
                    id: mons[0].id,
                    found: false
                },
                {
                    id: mons[1].id,
                    found: false
                },
                {
                    id: mons[2].id,
                    found: false 
                },
                {
                    id: mons[3].id,
                    found: false  
                },
                {
                    id: mons[4].id,
                    found: false
                }
            ];
            setPickedPokemon(mons);
            setFoundPokes(foundArray);
            setPokePics(pics);
            setPokeCards(pics.map((mon, index) => 
                <PokeCard
                    pokePic={mon.src}
                    pokeName={mons[index].name}
                    found={foundArray[index].found}
                    key={index}
                ></PokeCard>));
        }
        getData();
    }, [])
    
    const selectArea = (e) => {
        const boxWidth = 90;
        const boxHeight = 110;
        const parentPos = getPosition(e.target);
        const xPos = e.clientX - parentPos.x - boxWidth / 2;
        const yPos = e.clientY - parentPos.y - boxHeight / 2;
        setBoxView(
            <PokeView 
                boxCords={[xPos, yPos]}
                pokeList={pickedPokemon}
                foundPokes={foundPokes}
                foundFunction={updateFound}>
            </PokeView>
        );
    }

    const updateFound = (pokeID, boxCords) => {
        const found = checkFound(pokeID, boxCords);
        const index = foundPokes.map((poke) => poke.id).indexOf(pokeID);
        found.then(result => {
            setBoxView(null);
            setFoundPokes(foundPokes.slice(0, index)
            .concat([{id: pickedPokemon[index].id, found: result}])
            .concat(foundPokes.slice(index + 1)));
        })
    }

    useEffect(() => {
        const totalFound = foundPokes.reduce((prev, cur) => prev + cur.found, 0);
        if (totalFound === 5) {
            history.push({
                pathname: '/end',
                state: {
                    time: Date.now() - startTime.current,
                    name: name
                }
            });
        }
    })
    
    useEffect(() => {
        setPokeCards(pokePics.map((mon, index) => 
                <PokeCard
                    pokePic={mon.src}
                    pokeName={pickedPokemon[index].name}
                    found={foundPokes[index].found}
                    key={index}
                ></PokeCard>))
    }, [foundPokes, pickedPokemon, pokePics])

    return (
        <div>
            <h2>Pokemon to find:</h2>
            <div className='poke-box'>
                {pokeCards}
            </div>
            <div className='game-box' onClick={selectArea}>
                {boxView}
                <img 
                    src={pokePic} 
                    alt='pokemon-game' 
                    className='big-poke-pic'>
                </img>
            </div>
        </div>
    );
}

//borrowed from https://www.kirupa.com/snippets/move_element_to_click_position.htm
function getPosition(element) {
    let xPos = 0;
    let yPos = 0;

    while (element) {
        if (element.tagName === 'BODY') {
            let xScroll = element.scrollLeft || document.documentElement.scrollLeft;
            let yScroll = element.scrollTop || document.documentElement.scrollTop;

            xPos += (element.offsetLeft - xScroll + element.clientLeft);
            yPos += (element.offsetTop - yScroll + element.clientTop);
        } else {
            xPos += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPos += (element.offsetTop - element.scrollTop + element.clientTop);
        }
        element = element.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

export default Game;
