import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import GoalsList from '../../components/GoalsList/GoalsList';
import GoalRecommended from '../../components/GoalRecommended/GoalRecommended';
import GoalUnit from '../../components/GoalUnit/GoalUnit';
import axios from "axios";
import image from './no-goals-today.jpg';

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
      goals: []
    }
    this.goals_pending = [];
    this.goals_active = [];
    this.goals_history = [];
  }
  componentWillMount() {
    let error = false;
    axios.get('http://localhost:3000/profile', {
      withCredentials: true
    }).catch(error => {
      this.props.history.push("/login");
      error = true;
    }).then(response => {
      if (!error) {
        this.setState({ auth: true });
        axios.get('http://localhost:3000/users/' + response.data.id, {
          withCredentials: true
        }).then(response2 => {
          this.setState({ goals: response2.data.goals });
        });
      }
    });
  }
  sortGoals() {
    const current_date = new Date();
    const current_day = ((new Date()).getDay() + 6) % 7;
    console.log('this.state.goals: ', this.state.goals);
    this.state.goals.forEach((goal) => {
      let goal_date = new Date(goal.endDate);
      if (goal_date < current_date) {
        this.goals_history.push(goal);
      }
      else if (goal.weekdays.map((weekday) => +weekday.day).indexOf(current_day !== -1)) {
        this.goals_pending.push(goal);
      }
      else {
        this.goals_active.push(goal);
      }
    })
    // this.goals_pending = this.state.goals.filter((elem) => {
    //   return elem.weekdays.map((weekday) => +weekday.day).indexOf(current_date.getDay()) !== -1;
    // });
    // this.goals_active = this.state.goals.filter((elem) => {
    //   return elem.weekdays.map((weekday) => +weekday.day).indexOf(current_date.getDay()) === -1;
    // });
    console.log('this.goals_pending', this.goals_pending);
    console.log('this.goals_active', this.goals_active);
    console.log('this.goals_history', this.goals_history);

    // let start_date = new Date();
    // start_date.setDate(start_date.getDate() - 200);
    // let end_date = new Date();
    // end_date.setDate(end_date.getDate() - 150);

    // axios('http://localhost:3000/goals/create', {
    //   method: 'post',
    //   withCredentials: true,
    //   data: {
    //     title: 'ПРОШЛОЕ',
    //     weekdays: [{day: 1}, {day: 4}],
    //     startDate: new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString(),
    //     endDate: new Date(end_date.setUTCHours(0, 0, 0, 0)).toISOString()
    //   }
    // }).then(response => {
    // });
  }

  logOut() {
    axios.get('http://localhost:3000/profile/logout', {
      withCredentials: true
    }).then(response => console.log(response));
  }
  render() {
    return this.state.auth ? (
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
                      return <GoalUnit key={elem.id} title={elem.title} type='pending' />
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
            <div className="MainPage__goal-wrapper-title">
              Активные
            </div>
            <div className="MainPage__goal-list">
              {
                this.goals_active.map((elem) => {
                  return <GoalUnit key={elem.id} title={elem.title} type='active' />
                })
              }
            </div>
          </div>
          <div className="MainPage__goal-wrapper MainPage__goal-wrapper--recommended">
            <div className="MainPage__goal-wrapper-title">
              Рекомендуемые
            </div>
            <div className="MainPage__goal-list">
              <GoalRecommended />
              <GoalRecommended />
            </div>
          </div>
          <div className="MainPage__goal-wrapper MainPage__goal-wrapper--history">
            <div className="MainPage__goal-wrapper-title">
              Достигнутые 🎉
            </div>
            <div className="MainPage__goal-list">
              {
                this.goals_history.map((elem) => {
                  return <GoalUnit key={elem.id} title={elem.title} type='pending' />
                })
              }
            </div>
          </div>
          <br />
          MainPage
          <br /><br />
          <div className="Wrapper">
            <GoalsList />
          </div>
          <br />
          <Link to={"/login"} onClick={this.logOut}>
            Выйти
          </Link>
          <br />
          <Link to={"/goal/new"}>
            Новая цель
          </Link>
        </div>
      </div>
    ) : null;
  }
}

export default withRouter(MainPage);
