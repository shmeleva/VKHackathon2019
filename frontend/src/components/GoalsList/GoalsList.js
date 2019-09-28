import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const GoalsList = props => {
  return (
    <div className="GoalsList">
      <div className="GoalItem">День без сигарет</div>
      <div className="GoalItem">10 000 шагов</div>
      <div className="GoalItem">15-минутная зарядка в офисе</div>
    </div>
  )
}

export default GoalsList;
