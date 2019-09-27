import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const MainPage = props => {
  return (
    <div className="MainPage">
      MainPage
      <br/>
      <Link to={"/login"}>
        Разлогин
      </Link>
      <br/>
      <Link to={"/goal/new"}>
        Новая цель
      </Link>
    </div>
  )
}

export default MainPage;
