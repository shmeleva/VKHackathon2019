import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Header from '../../components/Header/Header';
import axios from "axios";
import {axios_url} from '../../js-variables';

class GoalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      pending: true,
      goal: {}
    }
    this.deleteGoal = this.deleteGoal.bind(this);
  }  
  componentWillMount() {
    const id = window.location.pathname.replace('/goal/','');
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
        axios.get(axios_url + '/goals/' + id, {
          withCredentials: true
        }).then(response2 => {
          this.setState({ 
            goal: response2.data,
            pending: false
          });
        });
      }
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
    return (
      <div className="GoalPage">
        <Header pageName="Страница цели" />
        <div className="GoalPage__inner page-content">
          Цель:<br/> {this.state.goal.title}
          <br/>
          <div className="GoalPage__delete-button" onClick={this.deleteGoal}>
            Удалить
          </div>
        </div>
      </div>
    )
  }
}

export default GoalPage;
