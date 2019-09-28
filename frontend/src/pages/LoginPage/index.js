import React from 'react';
import { Link } from 'react-router-dom';
import VKButton from '../../components/VKButton/VKButton';
import './styles.scss';

const LoginPage = props => {
  return (
    <div className="LoginPage">
      <div className="LoginPage__inner page-content">
        <div className="LoginPage__group-text">
          <div className="LoginPage__title">Добро пожаловать <br/>в ОРБИ.Привычки</div>
          <div className="LoginPage__description-title">В этом приложении можно:</div>
          <div className="LoginPage__description-list">
            <div className="LoginPage__description-unit">Создавать достижимые конкретные цели для выработки привычек</div>
            <div className="LoginPage__description-unit">Просить друзей поддержать вас через донаты в фонд</div>
            <div className="LoginPage__description-unit">Просить друзей поддержать вас через донаты в фонд</div>
          </div>
          <div className="container--flex-row-center">
            <VKButton/>
          </div>
        </div>
        <div className="LoginPage__bottom"/>
      </div>
      <Link to={"/main"}>
        На главную
      </Link>
    </div>
  )
}

export default LoginPage;
