import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';

const GoalPageNew = props => {
  console.log("-------GoalPageNew: ", props);
  return (
    <div className="GoalPageNew">
      <div className="GoalPageNew__inner page-content">
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
    </div>
  )
}

export default GoalPageNew;
