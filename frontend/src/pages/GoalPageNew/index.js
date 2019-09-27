import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const GoalPageNew = props => {
  console.log("-------GoalPageNew: ", props);
  return (
    <div className="GoalPageNew">
      GoalPageNew
      <br/>
      <Link to={"/main"}>
        Отменить
      </Link>
      <br/>
      <Link to={"/goal/100"}>
        Создать
      </Link>
    </div>
  )
}

export default GoalPageNew;
