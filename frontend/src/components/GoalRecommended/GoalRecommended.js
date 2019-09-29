import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import {recommended_goals} from '../../js-variables';



const GoalRecommended = props => {
  return (
    <div className="GoalRecommended">
      <div className="GoalRecommended__title">
        {recommended_goals[props.id].title}
      </div>
      <div className="GoalRecommended__description">
        {recommended_goals[props.id].description}
      </div>
      <Link to={"/goal/new/" + props.id} className="GoalRecommended__button">
        Добавить себе
      </Link>
    </div>
  )
}

export default GoalRecommended;

GoalRecommended.defaultProps = {
  id: 'no_sugar',
}