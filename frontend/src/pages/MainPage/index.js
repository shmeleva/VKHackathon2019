import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import GoalsList from '../../components/GoalsList/GoalsList';

const MainPage = props => {
  return (
    <div className="MainPage">
      <Header/>
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
  )
}

export default MainPage;
