import React from 'react';
import './styles.scss';
import {axios_url} from '../../js-variables';

class VKButton extends React.Component {
  render() {
    return (
      <a href={axios_url + '/auth/vkontakte'} className="VKButton">
          Войти
          <br />
          через ВКонтакте
      </a>
    )
  }
}

export default VKButton;
