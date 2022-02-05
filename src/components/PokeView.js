import React from 'react';

function PokeView(props) {
    const { boxCords, pokeList, foundPokes, foundFunction } = props;
    return (
        <div className='view-box'
            style={{ 
                top: `${boxCords[1]}px`,
                left: `${boxCords[0]}px`
                }}>
            <div className='view-square'></div>
            <div className='select-box'>
                {pokeList.map((mon, index) => {
                    if (foundPokes[index].found) return null;
                    else return <button 
                        className='select-button' 
                        onClick={() => foundFunction(mon.id, boxCords)}
                        key={index}>
                            {mon.name}
                        </button>
            })
            }
            </div>
        </div>
    );
}
export default PokeView;
