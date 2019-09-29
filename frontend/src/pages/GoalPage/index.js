import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import axios from "axios";
import {axios_url} from '../../js-variables';
import { VKShareButton, VKIcon } from 'react-share';



const CalendarUnit = props => {
  return (
    <div className={`CalendarUnit CalendarUnit--${props.state}`}>
      {props.day}
    </div>
  )
}
CalendarUnit.defaultProps = {
  day: 31,
  state: 'normal'
}

const Calendar = props => {
  let currentDate = new Date();
  let currentDay = ((new Date()).getDay() + 6) % 7;
  console.log('------ PROPS: ', props);
  const buildDays = () => {
    let state = 'normal';
    let counter = new Date(props.start.getTime());
    if (currentDate < counter) {
      state = 'disabled';
    }
    else if (props.weekdays.indexOf((counter.getDay() + 6)%7) !== -1){
      state = 'checked';
    }
    else {
      state = 'active';
    }
    let calendar = [<CalendarUnit day={counter.getDate()} state={state}/>];
    counter.setDate(counter.getDate() + 1);
    do {
      if (currentDate < counter) {
        state = 'disabled';
      }
      else if (props.weekdays.indexOf((counter.getDay() + 6)%7) !== -1){
        state = 'checked';
      }
      else {
        state = 'active';
      }
      calendar.push(<CalendarUnit day={counter.getDate()} state={state}/>);
      counter.setDate(counter.getDate() + 1);
    }
    while (counter.getDate() !== end.getDate());
    return calendar;
  }
  buildDays();
  return (
    <div className="Calendar">
      {buildDays()}
    </div>
  )
}
let start = new Date();
let end = new Date(); 
end.setDate(end.getDate() + 14);
Calendar.defaultProps = {
  start: start,
  end: end
}




class GoalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      pending: true,
      goal: null
    }
    this.deleteGoal = this.deleteGoal.bind(this);
  }  
  componentWillMount() {
    const id = window.location.pathname.replace('/goal/','');
    this.setState({ pending: true });
    this.error = false;
    axios.get(axios_url + '/profile', {
      withCredentials: true
    }).catch(error => {
      this.error = true;
      //this.props.history.push("/login");
    }).then(response => {
      if (!this.error) {
        this.setState({ auth: true });
      }
      axios.get(axios_url + '/goals/' + id, {
        withCredentials: true
      }).then(response2 => {
        this.period = Math.floor((new Date(response2.data.endDate) - new Date(response2.data.startDate))/(1000*60*60*24));
        this.progress = Math.min(Math.floor((new Date() - new Date(response2.data.startDate))/(1000*60*60*24)), this.period);
        this.setState({ 
          goal: response2.data,
          pending: false
        });
      });
    });
  }
  deleteGoal() {
    let error = false;
    axios(axios_url + '/goals/'+this.state.goal.id+'/delete', {
      method: 'post',
      withCredentials: true
    }).catch(error => {
      error = true;
    }).then(response => {
      if (!error) {
        this.props.history.push("/main");
      }
    });
  }
  render() {
    
    return this.state.goal ? (
      <div className="GoalPage">
        {console.log(this.state)}
        <Header pageName="Страница цели" />
        <div className="GoalPage__inner page-content">
          <div className="GoalPage__title">
            {this.state.goal.title}
          </div>
          <div className="GoalUnit__info">
            <span className="GoalUnit__info-timer">
              {this.progress}/{this.period}
            </span>
            <span className="GoalUnit__info-donations">
              {this.state.goal.donations.reduce(function(previousValue, currentValue) {
                return previousValue + currentValue.amount;
              }, 0)} руб. пожертвовали
            </span>
          </div>
          <div className="GoalUnit__links">
            <div className="GoalUnit__links-share">
              <VKShareButton url={document.location.origin + "/goal/" + this.state.goal.id} title={this.state.goal.title}>
                <VKIcon size={24} round={true} />
              </VKShareButton>
    
            </div>
            <Link className="GoalUnit__links-donate" to={"/donate/" + this.state.goal.id}>
              <span className="GoalUnit__heart-icon">🧠</span>&nbsp;Пожертвовать
            </Link>
          </div>
          <Calendar checks={this.state.goal.checks.map((check) => check.date)} weekdays={this.state.goal.weekdays.map((elem) => elem.day)} start={new Date(this.state.goal.startDate)} end={new Date(this.state.goal.endDate)}/>
          {
            this.state.auth && (
              <div className="GoalPage__delete-button" onClick={this.deleteGoal}>
                Удалить
              </div>
            )
          }
        </div>
      </div>
    ) : null;
  }
}

export default GoalPage;
