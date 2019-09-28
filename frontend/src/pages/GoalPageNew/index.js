import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import image from './girl.jpg';
import FieldWithHelpers from '../../components/FieldWithHelpers/FieldWithHelpers';

class GoalPageNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: null,
      period: null,
      days: [],
      daysNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    };
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
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

  render() {
    return (
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

            <Link 
            to={"/goal/100"}
            className={"primary-button "+(!(this.state.name && this.state.period && this.state.days.length > 0) && "primary-button--disabled")}>
              Создать
            </Link>
            <Link className="primary-button primary-button--bright" to={"/main"}>
              Отменить
            </Link>

          </form>

        </div>
      </div>
    )
  }
}

export default GoalPageNew;
