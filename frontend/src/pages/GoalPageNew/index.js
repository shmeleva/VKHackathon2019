import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import image from './girl.jpg';
import FieldWithHelpers from '../../components/FieldWithHelpers/FieldWithHelpers';
import axios from "axios";

Date.prototype.withoutTime = function () {
  var d = new Date(this);
  d.setHours(0, 0, 0, 0);
  return d;
}

class GoalPageNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: null,
      period: null,
      days: [],
      daysNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      auth: false
    };
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.createGoal = this.createGoal.bind(this);
  }
  componentWillMount(){
    console.log('MOUNT MOUNT');
    let error = false;
    axios.get('http://localhost:3000/profile', {
      withCredentials: true
    }).catch(error => {
      this.props.history.push("/login");
      error = true;
    }).then(response => {
      if (!error) {
        console.log(response);
        this.setState({auth: true, user_id: response.data.id});
      }
    });
  }

  handleNameChange(value) {
    this.setState(() => ({
      name: value
    }));    
  }

  handlePeriodChange(value) {
    this.setState((prevState) => ({
      period: value
    }));
  }

  handleDaysChange(checkbox) {
    const days = this.state.days;
    if (checkbox.checked) {
      days.push(checkbox.value);
    } else {
      const index = this.state.days.indexOf(checkbox.value);
      if (index != -1) {
        days.splice(index, 1);
      }
    }
    this.setState((prevState) => ({
      days
    }));
  }

  createGoal() {
    console.log('CREATEGOAL');
    let error = false;
    let end_date = new Date();
    end_date.setDate(end_date.getDate() + this.state.period);
    let data = {
      title: this.state.name,
      weekdays: [this.state.days.map((elem) => ({day: +elem}))],
      startDate: (new Date()).withoutTime().toISOString(),
      endDate: end_date.withoutTime().toISOString()
    }
    console.log(data);
    console.log(this.state.user_id);
    axios('http://localhost:3000/goals/create', {
      method: 'post',
      withCredentials: true,
      data: data
    }).catch(error => {
      error = true;
      console.log('ERRRRRROR');
    }).then(response => {
      console.log('then');
      if (!error) {
        console.log('NOOOOOORM');
      }
    });
  }

  render() {
    return this.state.auth ? (
      <div className="GoalPageNew">
        <Header pageName="Создание цели"/>
        <div className="GoalPageNew__inner page-content">
          <img className="GoalPageNew__image" src={image}/>

          <form className="GoalPageNew__form">

            <label className="field-label">Цель</label>
            <input 
              className="text-field"
              type="text" 
              placeholder="Пройти 10 000 шагов"
              key="newGoalName"
              onChange={(e)=> this.handleNameChange(e.target.value)}
            >
            </input>

            <label className="field-label">Срок</label>
            <FieldWithHelpers
              value={this.state.period}
              handleChange={this.handlePeriodChange}
              helpers={
                {
                  'Неделя': 7,
                  '2 недели': 14,
                  '21 день': 21,
                  '30 дней': 30,
                  '90 дней': 90
                }
              }
            />

            <label className="field-label">Периодичность</label>
            <div className="GoalPageNew__days">
            {this.state.daysNames.map((name, index) => (
              <label 
                className="GoalPageNew__day"
                key={index}
              >
                <input 
                  type="checkbox" 
                  value={index}
                  onChange={(e)=>{this.handleDaysChange(e.target)}}
                />
                <span className="text-field__helper">{name}</span>
              </label>
            ))}
            </div>

            <br/>

            <div 
              onClick={this.createGoal}
              className={"primary-button "+(!(this.state.name && this.state.period && this.state.days.length > 0) && "primary-button--disabled")}>
              Создать
            </div>
            <Link className="primary-button primary-button--bright" to={"/main"}>
              Отменить
            </Link>

          </form>

        </div>
      </div>
    ) : null;
  }
}

export default GoalPageNew;
