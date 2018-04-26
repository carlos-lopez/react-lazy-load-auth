import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    PrivateComponent: () => null,
    AuthStatus: () => null,
  }

  loadPrivateComponents = () =>
    import(/* webpackChunkName: "private" */ './Private')
    .catch(_ => ({
      ...this.state,
      AuthStatus: () =>
        <p style={ {color: 'red'} }>Provide username / passwd</p>,
    }))
    .then(components => this.setState(components))

  render() {
    const {
      PrivateComponent,
      AuthStatus,
    } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1>user: foo, password: bar</h1>
        </header>
        <p className="App-intro">
          This content is normally shown. The content below only renders when
          a second bundle gets properly loaded (requires password). It could
          be used at mount time of a parent component, instead of onClick.
        </p>
        <p className="App-intro">
          Avoid providing auth the first time and see what happens...
        </p>
        <button onClick={ this.loadPrivateComponents }>
          Load Private Components
        </button>
        <hr/>
        <PrivateComponent />
        <AuthStatus />
      </div>
    );
  }
}

export default App;
