import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import GoalsList from '../../components/GoalsList/GoalsList';
import GoalRecommended from '../../components/GoalRecommended/GoalRecommended';

const MainPage = props => {
  const current_goals = [];
  return (
    <div className="MainPage">
    <Header/>
      <div className="MainPage__inner page-content">
        <div className="MainPage__goal-wrapper MainPage__goal-wrapper--pending">
          <div className="MainPage__goal-wrapper-title">
            Цели на сегодня:
          </div>
          {
            (current_goals.length > 0) && [<GoalRecommended />, <GoalRecommended />]
          }
          {
            (current_goals.length === 0) && [
              <div key='text' className="MainPage__no-goals-text">
                На сегодня задач нет. Отдыхайте и идите гулять в парк!
              </div>,
              <div key='image' className="MainPage__no-goals-image"/>]
          }
        </div>
        <div className="MainPage__goal-wrapper MainPage__goal-wrapper--active">
          <div className="MainPage__goal-wrapper-title">
            Другие активные цели:
          </div>
          <GoalRecommended />
          <GoalRecommended />
        </div>
        <div className="MainPage__goal-wrapper MainPage__goal-wrapper--recommended">
          <div className="MainPage__goal-wrapper-title">
            Попробуйте такие цели:
          </div>
          <GoalRecommended />
          <GoalRecommended />
        </div>
        <div className="MainPage__goal-list MainPage__goal-wrapper--history">
          <div className="MainPage__goal-wrapper-title">
            Достигнутые:
          </div>
          <GoalRecommended />
          <GoalRecommended />
        </div>
        <br/>
        MainPage
        <br/><br/>
        <div className="Wrapper">
          <GoalsList/>
        </div>
        <br/>
        <Link to={"/login"}>
          Выйти
        </Link>
        <br/>
        <Link to={"/goal/new"}>
          Новая цель
        </Link>
      </div>
    </div>
  )
}

export default MainPage;
