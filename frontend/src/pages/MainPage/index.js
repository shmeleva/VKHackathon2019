import React from 'react';
import { Link, Redirect, withRouter} from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import GoalsList from '../../components/GoalsList/GoalsList';
import GoalRecommended from '../../components/GoalRecommended/GoalRecommended';
import GoalUnit from '../../components/GoalUnit/GoalUnit';
import axios from "axios";

const MainPage = props => {
  const current_goals = [5];
  let info;
  console.log(props)

  axios.get('http://localhost:3000/profile', {
    withCredentials: true
  }).catch(error => props.history.push("/login")).then(response => {
    info = response
  });

  // axios.get('http://localhost:3000/users/urum5toe', {
  //   withCredentials: true
  // }).then(response => console.log(response));

  const logOut = () => {
    axios.get('http://localhost:3000/profile/logout', {
      withCredentials: true
    }).then(response => console.log(response));
  }

  return (
    <div className="MainPage">
      <Header />
      <div className="MainPage__inner page-content">
        <div className="MainPage__goal-wrapper MainPage__goal-wrapper--pending">
          <div className="MainPage__goal-wrapper-title">
            Цели на сегодня:
          </div>
          {
            (current_goals.length > 0) && (
              <div className="MainPage__goal-list">
                <GoalUnit type='pending' />
                <GoalUnit type='pending' />
              </div>)
          }
          {
            (current_goals.length === 0) && [
              <div key='image' className="MainPage__no-goals-image" />,
              <div key='text' className="MainPage__no-goals-text">
                На сегодня задач нет. Отдыхайте и идите гулять в парк!
              </div>]
          }
        </div>
        <div className="MainPage__goal-wrapper MainPage__goal-wrapper--active">
          <div className="MainPage__goal-wrapper-title">
            Другие активные цели:
          </div>
          <div className="MainPage__goal-list">
            <GoalUnit type='active' />
            <GoalUnit type='active' />
          </div>
        </div>
        <div className="MainPage__goal-wrapper MainPage__goal-wrapper--recommended">
          <div className="MainPage__goal-wrapper-title">
            Попробуйте такие цели:
          </div>
          <div className="MainPage__goal-list">
            <GoalRecommended />
            <GoalRecommended />
          </div>
        </div>
        <div className="MainPage__goal-wrapper MainPage__goal-wrapper--history">
          <div className="MainPage__goal-wrapper-title">
            Достигнутые:
          </div>
          <div className="MainPage__goal-list">
            <GoalUnit type='history' />
            <GoalUnit type='history' />
          </div>
        </div>
        <br />
        MainPage
        <br /><br />
        <div className="Wrapper">
          <GoalsList />
        </div>
        <br />
        <Link to={"/login"} onClick={logOut}>
          Выйти
        </Link>
        <br />
        <Link to={"/goal/new"}>
          Новая цель
        </Link>
      </div>
    </div>
  ) 
}

export default withRouter(MainPage);
