import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { VKShareButton, VKIcon } from 'react-share';

const CalendarUnit = props => {
  return (
    <div className={`CalendarUnit CalendarUnit--${props.state}`}>
      {props.day}
    </div>
  )
}
CalendarUnit.defaultProps = {
  day: 'ПН',
  state: 'normal'
}

const Calendar = props => {
  let currentDay = ((new Date()).getDay() + 6) % 7;
  return (
    <div className="Calendar">
      {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => <CalendarUnit key={i} day={day} state={currentDay < i ? 'disabled' : 'normal'} />)}
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



const svgIcons = props => {
  return ({
    'share': <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path d="M41.28 10.323h178.774l73.052 82.466H115.194c-17.61 0-32.02 14.41-32.02 32.02v401.403c0 17.598 14.41 32.02 32.02 32.02h406.328c17.61 0 32.02-14.422 32.02-32.02v-181.62l83.174 69.19v185.624c0 22.7-18.567 41.28-41.28 41.28H41.28c-22.712 0-41.28-18.58-41.28-41.28V51.604c0-22.702 18.568-41.28 41.28-41.28zM640-.685L311.378 13.843l104.801 104.8-230.755 230.744 101.21 101.21 230.755-230.755 106.82 106.82L640-.685z" /></svg>,
    'donate': <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path fill-rule="nonzero" d="M319.988 156.51c109.891-191.164 320-107.824 320 34.796 0 139.147-140.187 272.2-320 403.74C132.568 472.649 0 330.454 0 191.307 0 43.336 212.341-30.756 319.988 156.51z" /></svg>
  })
}

const GoalUnit = props => {
  var date = new Date();
  return (
    <div className={`GoalUnit GoalUnit--${props.type}`}>
      <div className="GoalUnit__title">
        {props.title}
      </div>
      <Link className="GoalUnit__more-link" to={`./goal/${props.id}`}>
        Подробнее >
      </Link>
      <div className="GoalUnit__info">
        <span className="GoalUnit__info-timer">
          {props.timer}
        </span>
        <span className="GoalUnit__info-donations">
          {props.donations}
        </span>
      </div>
      {
        props.type !== 'history' && <Calendar />
      }
      <div className="GoalUnit__links">
        <div className="GoalUnit__links-share">
          <VKShareButton url={document.location.origin + "/goal/" + props.id} title={props.title}>
            <VKIcon size={24} round={true} />
          </VKShareButton>

        </div>
        <Link className="GoalUnit__links-donate" to={"/donate/" + props.id}>
          <span className="GoalUnit__heart-icon">🧠</span>&nbsp;Пожертвовать
      </Link>
      </div>
      {
        props.type === 'pending' && (<div className="GoalUnit__check">
          Отметить сегодня
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