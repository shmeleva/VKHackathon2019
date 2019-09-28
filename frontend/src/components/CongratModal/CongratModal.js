import React from 'react';
import './styles.scss';
import image from './share.jpg';

const CongratModal = props => { 

  return (
    <div className="CongratModal">
      <div>
      <div 
        className="CongratModal__close"
        onClick={() => {
          document.querySelector(".CongratModal").style = "visibility: hidden; opacity: 0; pointer-events: none;";
        }}>
        Закрыть
      </div>
      <img src={image} className="CongratModal__image"/>
      <div>
      Ура! {
        // props.text 
        // || "Ты создал свою первую цель! Поделись ею с друзьями и попроси их поддержать фонд ОРБИ пожертвованиями."
        <h3>"Мы допилим этот проект!"</h3>
      }
      </div>
      <button className="CongratModal__share-button">Поделиться</button>
      </div>
    </div>
  )
}

export default CongratModal;