import React from 'react'


function CellValues({ count, playerIcon, player1icon, player2icon, player3icon, player4icon }) {
  
  return (
    <div className='box'>
      <div>{count}</div>
      {playerIcon.map((val, key) =>
        <span>{playerIcon[key].playerPos === count ? playerIcon[key].playerIcon : ''}</span>
      )}
    </div>
  )
}

export default CellValues