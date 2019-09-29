import React from 'react';
import './styles.scss';
import {axios_url} from '../../js-variables';

class VKButton extends React.Component {
  render() {
    return (
      <div className="VKButton">
        <a href={axios_url + '/auth/vkontakte'}>
          Войти
          <br />
          через ВКонтакте
        </a>
      </div>
    )
  }
}

export default VKButton;
