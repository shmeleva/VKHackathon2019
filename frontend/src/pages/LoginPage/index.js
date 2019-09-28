import React from 'react';
import { Link } from 'react-router-dom';
import VKButton from '../../components/VKButton/VKButton';
import './styles.scss';

const LoginPage = props => {
  return (
    <div className="LoginPage">
      <div className="LoginPage__inner page-content">
        <div className="LoginPage__title">Добро пожаловать в ОРБИ.Привычки</div>
        <div className="LoginPage__description">В этом приложении можно:</div>
        <ul>
          <li>Создавать достижимые конкретные цели для выработки привычек</li>
          <li>Просить друзей поддержать вас через донаты в фонд</li>
          <li>Просить друзей поддержать вас через донаты в фонд</li>
        </ul>
        <br/>
        <div className="container--flex-row-center">
          <VKButton/>
        </div>
        <br/>
        <Link to={"/main"}>
          На главную
        </Link>
        <div className="LoginPage__bottom"/>
      </div>
    </div>
  )
}

export default LoginPage;
