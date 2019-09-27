import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const LoginPage = props => {
  return (
    <div className="LoginPage">
      LoginPage
      <br/>
      <Link to="/main">
        Зайти через vk
      </Link>
    </div>
  )
}

export default LoginPage;
