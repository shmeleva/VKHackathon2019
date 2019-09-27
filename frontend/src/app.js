import React from 'react';
import ReactDOM from 'react-dom';
import BaseRouter from './routers/BaseRouter';
import './styles/styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
			<BaseRouter />
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
