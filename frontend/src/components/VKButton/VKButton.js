import React from 'react';
import './styles.scss';

class VKButton extends React.Component {
  render() {
    return (
      <div className="VKButton">
        <a href={'https://orbi-habits-api.herokuapp.com' + '/auth/vkontakte'}>
          Войти
          <br />
          через ВКонтакте
        </a>
      </div>
    )
  }
}

export default VKButton;
