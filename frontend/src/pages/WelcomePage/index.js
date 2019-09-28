import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';

const WelcomePage = props => {
  return (
    <div className="WelcomePage">
      <Header/>
      <div className="WelcomePage__inner page-content">
        <div className="WelcomePage__title">
          Создайте свою первую цель!
        </div>
      </div>
    </div>
  )
}

export default WelcomePage;
