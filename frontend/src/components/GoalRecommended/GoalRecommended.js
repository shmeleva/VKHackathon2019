import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const GoalRecommended = props => {
  return (
    <div className="GoalRecommended">
      <div className="GoalRecommended__title">
         {props.title}
      </div>
      <div className="GoalRecommended__description">
       {props.description}
      </div>
      <Link to={"/goal/100"} className="GoalRecommended__button">
        Добавить цель
      </Link>
    </div>
  )
}

export default GoalRecommended;

GoalRecommended.defaultProps = {
  title: 'День без сладкого',
  description: 'Быстрые углеводы не приносят пользы, но способствуют увеличению веса.'
}