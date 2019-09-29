import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../../components/Header/Header'
import './styles.scss';
import image from './donate-img.jpg';
import FieldWithHelpers from '../../components/FieldWithHelpers/FieldWithHelpers';
import { axios_url } from '../../js-variables';
import axios from "axios";

class DonatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.donate = this.donate.bind(this);
  }

  handleAmountChange(amount) {
    this.setState(() => ({
      amount: amount >= 0 ? amount : -amount
    }))
  }

  donate() {
    let error = false;
    axios(`${axios_url}/goals/${this.props.match.params.id}/donate`, {
      method: 'post',
      withCredentials: true,
      data: {
        amount: this.state.amount
      }
    }).catch(error => {
      error = true;
    }).then(response => {
      if (!error) {
        this.props.history.push(`/goal/${this.props.match.params.id}`);
      }
    });
  }

  render() {
    return (
      <div className="DonatePage">
        <Header pageName="Пожертвование в фонд" />
        <div className="DonatePage__inner page-content page-content--form-wrapper">
          <img className="image--centered" src={image} />

          <label className="field-label">Сумма пожертвования</label>
          <FieldWithHelpers
            value={this.state.amount}
            handleChange={this.handleAmountChange}
            placeholder="Введите сумму пожертвования"
            helpers={
              {
                '100 ₽': 100,
                '200 ₽': 200,
                '500 ₽': 500,
                '1 000 ₽': 1000,
                '5 000 ₽': 5000
              }
            }
          />
          <br />
          <div
            onClick={this.donate}
            className={"primary-button " + (!this.state.amount && "primary-button--disabled")}>
            ПОЖЕРТВОВАТЬ
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(DonatePage);
