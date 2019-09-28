import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import image from './girl.jpg';

const GoalPageNew = props => {
  console.log("-------GoalPageNew: ", props);
  return (
    <div className="GoalPageNew">
      <Header pageName="Создание цели"/>
      <div className="GoalPageNew__inner page-content">
        <img className="GoalPageNew__image" src={image}/>
        <label className="field-label">Цель</label>
        <input 
          className="text-field" 
          type="text" 
          placeholder="Пройти 10 000 шагов">
        </input>
        <label className="field-label">Срок</label>
        <label className="field-label">Периодичность</label>
        <br/>
        <Link className="primary-button primary-button--bright" to={"/main"}>
          Отменить
        </Link>
        <Link className="primary-button" to={"/goal/100"}>
          Создать
        </Link>
      </div>
    </div>
  )
}

export default GoalPageNew;
