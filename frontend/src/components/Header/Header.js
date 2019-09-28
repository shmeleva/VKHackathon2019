import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Header = props => {
  return (
    <div className="Header">
      <div className="Header__inner">
        <Link className="Header__logo" to={"/main"}>
        ОРБИ.Привычки
        </Link>
      </div>
      {props.pageName && 
        <div className="Header__breadcrumbs">
          <Link className="Header__back-button" to={"/main"}>
          ← Назад
          </Link>
          {props.pageName}
        </div>
      }
    </div>
  )
}

export default Header;
