import React from 'react';
import { Link } from 'react-router-dom';
import VKButton from '../../components/VKButton/VKButton';
import './styles.scss';
import Header from '../../components/Header/Header';

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
          <VKButton/>
        </div>
        <div className="LoginPage__bottom"/>
      </div>
      <Link to={"/main"}>
        На главную
      </Link>
      <Link to={"/welcome"}>
        На онбординг
      </Link>
    </div>
  )
}

export default LoginPage;
