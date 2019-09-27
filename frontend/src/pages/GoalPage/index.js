import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const GoalPage = props => {
  console.log("-------GoalPage: ", props);
  return (
    <div className="GoalPage">
      GoalPage
      <br/>
      <Link to={"/main"}>
        На главную
      </Link>
      <br/>
      <Link to={"/main"}>
        Удалить
      </Link>
    </div>
  )
}

export default GoalPage;
