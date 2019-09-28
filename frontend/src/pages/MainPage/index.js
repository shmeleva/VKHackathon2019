import React from 'react';
import { Link, Redirect, withRouter} from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import GoalsList from '../../components/GoalsList/GoalsList';
import GoalRecommended from '../../components/GoalRecommended/GoalRecommended';
import GoalUnit from '../../components/GoalUnit/GoalUnit';
import axios from "axios";

Date.prototype.withoutTime = function () {
  var d = new Date(this);
  d.setHours(0, 0, 0, 0);
  return d;
}

class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.current_goals = [5];
    this.props = props;
    this.state = {
      auth: false,
      goals: []
    }
  }
  componentWillMount(){
    let error = false;
    axios.get('http://localhost:3000/profile', {
      withCredentials: true
    }).catch(error => {
      this.props.history.push("/login");
      error = true;
    }).then(response => {
      if (!error) {
        this.setState({auth: true});
        axios.get('http://localhost:3000/users/' + response.data.id, {
          withCredentials: true
        }).then(response2 => {
          this.setState({goals: response2.data.goals});
        });
      }
    });
  }
  sortGoals(){
    const current_date = new Date().withoutTime();
    debugger
  }

  logOut(){
    axios.get('http://localhost:3000/profile/logout', {
      withCredentials: true
    }).then(response => console.log(response));
  }
  render(){
    return this.state.auth ? (
      <div className="MainPage">
        {this.sortGoals()}
        <Header />
        <div className="MainPage__inner page-content">
          <div className="MainPage__goal-wrapper MainPage__goal-wrapper--pending">
            <div className="MainPage__goal-wrapper-title">
              Цели на сегодня:
            </div>
            {
              (this.current_goals.length > 0) && (
                <div className="MainPage__goal-list">
                  <GoalUnit type='pending' />
                  <GoalUnit type='pending' />
                </div>)
            }
            {
              (this.current_goals.length === 0) && [
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
