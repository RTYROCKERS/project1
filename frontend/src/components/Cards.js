import React from 'react';
import CardItem from '../components/CardItem';
import '../styles/Cards.css';

function Cards() {
  return (
    <div className='cards'>
      <h1>Testimonials:Some Reviews</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem 
            src = 'frontend\src\assets\Bgimageofsignpage.jpeg'
            text='Explore the hidden waterfall deep.'
            label='Adventure'
            path='/services'
            />
            <CardItem 
            src = 'frontend\src\assets\Bgimageofsignpage.jpeg'
            text='Explore the hidden waterfall deep.'
            label='Adventure'
            path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem 
            src = 'frontend\src\assets\Bgimageofsignpage.jpeg'
            text='Explore the hidden waterfall deep.'
            label='Adventure'
            path='/services'
            />
            <CardItem 
            src = 'frontend\src\assets\Bgimageofsignpage.jpeg'
            text='Explore the hidden waterfall deep.'
            label='Adventure'
            path='/services'
            />
            <CardItem 
            src = 'frontend\src\assets\Bgimageofsignpage.jpeg'
            text='Explore the hidden waterfall deep.'
            label='Adventure'
            path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;

