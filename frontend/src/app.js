import React from 'react';
import ReactDOM from 'react-dom';
import SomeComponent from './components/SomeComponent';
import './styles/styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SomeComponent />
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
