import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Header = props => {
  return (
    <div className="Header">
      <Link className="Header__logo" to={"/main"}>
        ОРБИ.Привычки
      </Link>
    </div>
  )
}

export default Header;
