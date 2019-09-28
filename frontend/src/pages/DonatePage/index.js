import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header'
import './styles.scss';
import image from './donate-img.jpg';
import FieldWithHelpers from '../../components/FieldWithHelpers/FieldWithHelpers';

class DonatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      amount: 0
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }  

  handleAmountChange(amount) {
    this.setState(() => ({
      amount
    }))
  }

  render() {
    return (
      <div className="DonatePage">
      <Header pageName="Пожертвование"/>
        <div className="DonatePage__inner page-content page-content--form-wrapper">
          <img className="image--centered" src={image}/>
          
          <label className="field-label">Сумма пожертвования</label>
          <FieldWithHelpers
            value={this.state.amount}
            handleChange={this.handleAmountChange}
            placeholder="Введите сумму"
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
          <br/>
          <Link 
          to={"/goal/100"}
          className={"primary-button "+(!this.state.amount && "primary-button--disabled")}>
            Отправить
          </Link>
        </div>
      </div>
    )
  }
}

export default DonatePage;
