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

        <form className="GoalPageNew__form">

          <label className="field-label">Цель</label>
          <input className="text-field"
                 type="text" 
                 placeholder="Пройти 10 000 шагов">
          </input>

          <label className="field-label">Срок (кол-во дней)</label>
          <input className="text-field"
          type="text" 
          placeholder="30">
          </input>
          <span className="text-field__helper text-field__helper--active">Неделя</span>
          <span className="text-field__helper">2 недели</span>
          <span className="text-field__helper">21 день</span>
          <span className="text-field__helper">30 дней</span>
          <span className="text-field__helper">90 дней</span>

          <label className="field-label">Периодичность</label>

          <Link className="primary-button" to={"/goal/100"}>
            Создать
          </Link>
          <Link className="primary-button primary-button--bright" to={"/main"}>
            Отменить
          </Link>

        </form>

      </div>
    </div>
  )
}

export default GoalPageNew;
