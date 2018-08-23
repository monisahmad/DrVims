import React, { Component } from 'react';
import './App.css';

const sleep = timeInMS => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeInMS);
  })
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: Math.random() * 20,
      game: 1,
      winner: '',
      player: 'Player 1',
    };
    this.increment = this.increment.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  async increment(event) {
    const count = this.state.count - event.target.value;
    if (count <= 0) {
      this.setState({ winner: this.state.player, game: 0 });
    }
    this.setState({ count });
    if (this.state.player === 'Player 1') {
      this.setState({ player: 'Player 2' });
    } else {
      this.setState({ player: 'Player 1' });
    }
  }

  resetGame() {
    this.setState({
      count: Math.random() * 20,
      game: 1,
      winner: '',
      player: 'Player 1',
    });
  }


  render() {
    const {
      game, player, winner, count,
    } = this.state;
    const message = `${player}'s Turn`;
    const coins = [];

    for (let i = 0; i < count; i += 1) {
      const circleStyle = {
        width: 80,
        height: 80,
        border: '3px solid black',
        display: 'inline-block',
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
          <div >
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
        <h1>Game Over</h1>
        <h2> {winner} Wins!!! </h2>
        <button onClick={this.resetGame}>Restart</button>
      </div>
    );
  }
}


export default App;
