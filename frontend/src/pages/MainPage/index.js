import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import GoalsList from '../../components/GoalsList/GoalsList';
import GoalRecommended from '../../components/GoalRecommended/GoalRecommended';
import GoalUnit from '../../components/GoalUnit/GoalUnit';
import axios from "axios";
import image from './no-goals-today.jpg';
import CongratModal from '../../components/CongratModal/CongratModal';
import {axios_url} from '../../js-variables';

Date.prototype.withoutTime = function () {
  var d = new Date(this);
  d.setHours(0, 0, 0, 0);
  return d;
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      auth: false,
      pending: true,
      goals: []
    }
    this.logOut = this.logOut.bind(this);
  }
  componentWillMount() {
    this.setState({ pending: true });
    let error = false;
    axios.get(axios_url + '/profile', {
      withCredentials: true
    }).catch(error => {
      error = true;
      this.props.history.push("/login");
    }).then(response => {
      if (!error) {
        this.setState({ auth: true });
        axios.get(axios_url + '/users/' + response.data.id, {
          withCredentials: true
        }).then(response2 => {
          if (response2.data.goals.length === 0) {
            this.props.history.push("/welcome");
          }
          else {
            this.setState({ goals: response2.data.goals, pending: false });
          }
        });
      }
    });
  }
  sortGoals() {
    this.goals_pending = [];
    this.goals_active = [];
    this.goals_history = [];
    const current_date = new Date();
    const current_dateABS = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();
    const current_day = ((new Date()).getDay() + 6) % 7;
    this.state.goals.forEach((goal) => {
      let goal_date = new Date(goal.endDate);
      if (goal_date < current_date) {
        this.goals_history.push(goal);
      }
      else if (goal.weekdays.map((weekday) => +weekday.day).indexOf(current_day) !== -1) {
        if (goal.checks.map((check) => check.date).indexOf(current_dateABS) !== -1){
          this.goals_active.push(goal);
        }
        else {
          this.goals_pending.push(goal);
        }
      }
      else {
        this.goals_active.push(goal);
      }
    })
  }

  logOut() {
    axios.get(axios_url + '/profile/logout', {
      withCredentials: true
    }).then(response => {
      this.props.history.push("/login");
    });
  }
  render() {
    return this.state.auth && !this.state.pending ? (
      <div className="MainPage">
        {this.sortGoals()}
        <Header />
        <div className="MainPage__inner page-content">
          <div className="MainPage__goal-wrapper MainPage__goal-wrapper--pending">
            <div className="MainPage__goal-wrapper-title">
              Сегодняшние
            </div>
            {
              (this.goals_pending.length > 0) && (
                <div className="MainPage__goal-list">
                  {
                    this.goals_pending.map((elem) => {
                      return <GoalUnit goal={elem} key={elem.id} id={elem.id} title={elem.title} type='pending' />
                    })
                  }
                </div>)
            }
            {
              (this.goals_pending.length === 0) && [
                <img src={image} className="MainPage__no-goals-image image--centered" />,
                <div key='text' className="MainPage__no-goals-text">
                  На сегодня задач нет. Отдыхайте и идите гулять в парк!
                </div>]
            }
          </div>
          <div className="MainPage__goal-wrapper MainPage__goal-wrapper--active">
            {
              (this.goals_active.length > 0) && [
                <div className="MainPage__goal-wrapper-title">
                Активные
                </div>,
                <div className="MainPage__goal-list">
                {
                  this.goals_active.map((elem) => {
                    return <GoalUnit goal={elem} key={elem.id} id={elem.id} title={elem.title} type='active' />
                  })
                }
                </div>
              ]
            }
            {
              (this.goals_active.length === 0 && this.goals_pending.length > 0) && (
                <div key='text' className="MainPage__no-active-goals-text">
                Добавьте еще цели! Будьте еще больше ЗОЖ!
                </div>
              )
            }
            <Link className="MainPage__add-goal primary-button" to={"/goal/new"}>
            + Добавить цель
            </Link>
          </div>
          <div className="MainPage__goal-wrapper MainPage__goal-wrapper--recommended">
            <div className="MainPage__goal-wrapper-title">
              Рекомендуемые
            </div>
            <div className="MainPage__goal-list">
              <GoalRecommended id='no_sugar'/>
              <GoalRecommended id='no_smoking'/>
            </div>
          </div>
          { 
            (this.goals_history.length > 0) && (
              <div className="MainPage__goal-wrapper MainPage__goal-wrapper--history">
                <div className="MainPage__goal-wrapper-title">
                  Достигнутые 🎉
                </div>
                <div className="MainPage__goal-list">
                  {
                    this.goals_history.map((elem) => {
                      return <GoalUnit goal={elem} key={elem.id} id={elem.id} title={elem.title} type='history' />
                    })
                  }
                </div>
              </div>
            )
          }
          <div onClick={this.logOut}>
            Выйти
          </div>
          <br />
        </div>
      </div>
    ) : null;
  }
}

export default withRouter(MainPage);
