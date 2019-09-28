import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

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
  console.log(props);
  const buildDays = () => {
    let counter = new Date(props.start.getTime());
    let calendar = [<CalendarUnit day={counter.getDate()} state={['normal', 'checked','missed', 'normal', 'normal'][counter.getDate()%5]}/>];
    counter.setDate(counter.getDate() + 1);
    do {
      calendar.push(<CalendarUnit day={counter.getDate()} state={['normal', 'checked','missed', 'normal', 'normal'][counter.getDate()%5]}/>);
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
end.setDate(end.getDate() + 7);
Calendar.defaultProps = {
  start: start,
  end: end
}





const GoalUnit = props => {
  var date = new Date();
  return (
    <div className={`GoalUnit GoalUnit--${props.type}`}>
      <div className="GoalUnit__title">
         {props.title}
      </div>
      <div className="GoalUnit__more-link">
         Подробнее >
      </div>
      <div className="GoalUnit__info">
        <span className="GoalUnit__info-timer">
          {props.timer}
        </span>
        <span className="GoalUnit__info-donations">
          {props.donations}
        </span>
      </div>
      <Calendar/>
      <div className="GoalUnit__links">
      <div className="GoalUnit__links-share">
        Поделиться с друзьями
      </div>
      <Link className="GoalUnit__links-donate" to={"/donate/100"}>
        <span className="GoalUnit__heart-icon">❤</span>&nbsp;Пожертвовать
      </Link>
      </div>
      {
        props.type === 'pending' && (<div className="GoalUnit__check">
            Отметиться
          </div>)
      }
    </div>
  )
}

export default GoalUnit;

GoalUnit.defaultProps = {
  title: 'День без сладкого',
  timer: '24/60 дней',
  donations: '5000 руб. пожертвовали',
  type: 'active'
}