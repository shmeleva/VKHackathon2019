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
      period: null
    };
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
  }

  handlePeriodChange(value) {
    this.setState(() => ({
      period: value
    }));
  };

  render() {
    return (
      <div className="GoalPageNew">
        <Header pageName="Создание цели"/>
        <div className="GoalPageNew__inner page-content">
          <img className="GoalPageNew__image" src={image}/>

          <form className="GoalPageNew__form">

            <label className="field-label">Цель</label>
            <input className="text-field"
                  type="text" 
                  placeholder="Пройти 10 000 шагов">
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

            <Link className="primary-button" to={"/goal/100"}>
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
