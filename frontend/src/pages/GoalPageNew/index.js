import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';

const GoalPageNew = props => {
  console.log("-------GoalPageNew: ", props);
  return (
    <div className="GoalPageNew">
      <Header/>
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
