import React from 'react';

const Card = ({ id, name, email }) => {
	return (
		<div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
			<img
				alt={`Robot avatar for ${name}`}
				src={`https://robohash.org/${id}?size=200x200`}
				width='200'
				height='200'
				loading='lazy'
			/>
			<div>
				<h2>{name}</h2>
				<p>{email}</p>
			</div>
		</div>
	);
}

export default Card;
