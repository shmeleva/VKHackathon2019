import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import VKButton from '../../components/VKButton/VKButton';
import './styles.scss';
import Header from '../../components/Header/Header';
import axios from "axios";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      auth: true
    }
  }
  componentWillMount(){
    this.error = false;
    axios.get('http://localhost:3000/profile', {
      withCredentials: true
    }).catch(error => {
      this.error = true;
      console.log('---error!!! ', this.error)
      this.setState({auth: false});
    }).then(response => {
      if (!this.error) {
        this.props.history.push("/main");
        console.log('---error: ', this.error)
      }
    });
  }
  render() {
    return !this.state.auth ? (
      <div className="LoginPage">
        <div className="LoginPage__inner page-content">
          <div className="LoginPage__group-text">
            <div className="LoginPage__title">Добро пожаловать <br/>в ОРБИ.Привычки</div>
            <div className="LoginPage__description-title">В этом приложении можно:</div>
            <div className="LoginPage__description-list">
              <div className="LoginPage__description-unit">Создавать достижимые конкретные цели для выработки привычек</div>
              <div className="LoginPage__description-unit">Просить друзей поддержать вас через донаты в фонд</div>
              <div className="LoginPage__description-unit">Просить друзей поддержать вас через донаты в фонд</div>
            </div>
            <VKButton/>
          </div>
          <div className="LoginPage__bottom"/>
        </div>
        <Link to={"/main"}>
          На главную
        </Link>
        <Link to={"/welcome"}>
          На онбординг
        </Link>
      </div>
    ) : null;
  }
}

export default withRouter(LoginPage);
