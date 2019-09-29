import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import GoalRecommended from '../../components/GoalRecommended/GoalRecommended';

const WelcomePage = props => {
  return (
    <div className="WelcomePage">
      <Header/>
      <div className="WelcomePage__inner page-content">
        <div className="WelcomePage__title">
          Создайте свою первую цель!
        </div>
        <div className="WelcomePage__image"/>
        <Link to={"/goal/new"} className="WelcomePage__create">
          + Создать цель
        </Link>
        <div className="WelcomePage__suggestion-title">
          или выберите из готовых:
        </div>
        <div className="WelcomePage__suggestion-list">
          <GoalRecommended id='no_sugar'/>
          <GoalRecommended id='no_smoking'/>
        </div>

      </div>
    </div>
  )
}

export default WelcomePage;
