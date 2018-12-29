import React from 'react';


const Card = ({name, email, id}) => {
  return (
    <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-s' style={{height: '350px', width: '250px', overflow: 'hidden',whiteSpace: 'wrap'}}>
      <img alt='avatar' src={`https://robohash.org/${id}?size=200x200`}/>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}
export default Card;
