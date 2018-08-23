import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 12,
      game: 1,
      computer: 0,
    };
    this.increment = this.increment.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  async increment(event) {
    let count = this.state.count - event.target.value;
    await sleep(500);
    this.setState({ count, computer: 0 });
    let comp = 0;
    while (count % 4 !== 0) {
      await sleep(500);
      count -= 1;
      comp += 1;
      this.setState({ count, computer: comp });
    }
    if (count <= 0) {
      this.setState({ game: 0, count: 0 });
    }
  }

  resetGame() {
    this.setState({
      count: 12,
      game: 1,
      computer: 0,
    });
  }


  render() {
    const { game, computer } = this.state;
    let message = '';
    if (computer === 0) {
      message = 'Draw Some Coins';
    } else {
      message = `Computer has drawn ${computer} coins`;
    }
    const coins = [];
    for (let i = 0; i < this.state.count; i += 1) {
      const circleStyle = {
        width: 80,
        height: 80,
        border: '3px solid black',
        float: 'left',
        margin: 10,
        borderRadius: '50%',
      };
      if (i === 0) {
        circleStyle.backgroundColor = 'yellow';
      } else {
        circleStyle.backgroundColor = 'red';
      }
      const circle = <div style={circleStyle} />;
      coins.push(circle);
    }

    if (game) {
      return (
        <div className="App">
          <div>
            {coins}
          </div>
          <h2 >{message}</h2>
          <br />
          <div>
            <button value="1" onClick={this.increment}>Draw 1</button>
            <button value="2" onClick={this.increment}>Draw 2</button>
            <button value="3" onClick={this.increment}>Draw 3</button>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <h1>{this.state.count}</h1>
        <h1>Game Over</h1>
        <h2>{message}</h2>
        <h2> Computer Won </h2>
        <button onClick={this.resetGame}>Restart</button>
      </div>
    );
  }
}

const sleep = timeInMS => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeInMS);
  })
);

export default App;
