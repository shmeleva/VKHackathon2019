import React from 'react';
import './styles.scss';

class VKButton extends React.Component {
  render() {
    return (
      <div className="VKButton">
        <a href='//localhost:3000/auth/vkontakte'>
          Зарегистироваться 
          <br/> 
          через VK
        </a>
      </div>
    )
  }
}

export default VKButton;
