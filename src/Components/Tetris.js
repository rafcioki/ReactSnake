import React, { Component } from 'react';
import styled from 'styled-components';
import Board from './Board';
import ControlPanel from './ControlPanel';

const GameContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export default class Tetris extends Component {
    constructor(props) {
        super(props);

        this.mapSize = 20;
        this.initialSnakeLength = 3;

        this.snakePositions = [];
        this.addSnakeOnInitialPosition();

        this.direction = 'right';
        this.state = this.getInitialState();
    }

    componentWillMount() {
        document.addEventListener("keyPress", this.onKeyPressed, false);
    }

    onKeyPressed(e) {
        console.log(e);
    }

    getInitialState() {
        return {
            paused: true,
            board: this.createBoardSyncedWithSnakePositions()
        };
    }

    createEmptyTwoDimensionalArray() {
        const board = [];

        for (let i = 0; i < this.mapSize; ++i) {
            board.push([]);

            for (let j = 0; j < this.mapSize; ++j) {
                board[i].push('');
            }
        }

        return board;
    }

    addSnakeOnInitialPosition() {
        this.snakePositions.push({ x: 4, y: 4 });
        this.snakePositions.push({ x: 4, y: 5 });
        this.snakePositions.push({ x: 4, y: 6 });
    }

    createBoardSyncedWithSnakePositions() {
        const board = this.createEmptyTwoDimensionalArray();

        for (let i = 0; i < this.snakePositions.length; ++i) {
            const x = this.snakePositions[i].x;
            const y = this.snakePositions[i].y;

            board[x][y] = 'X';
        }

        return board;
    }

    onStartPauseClickedCallback() {
        this.setState(prevState => {
            paused: !prevState.paused
        }, () => this.onStartPauseStateChanged());
    }

    onStartPauseStateChanged() {
        if (!this.state.paused) {
            this.timerId = setInterval(1000, this.onTick);
        } else {
            clearInterval(this.timerId);
        }
    }

    onTick() {

    }

    tryToMoveSnake() {
        
    }

    checkCollision() {
        return false;
    }

    render () {
        return [
                <Board board={this.state.board} />,
                <ControlPanel paused={this.state.paused} onStartPauseClicked={this.state.onStartPauseClickedCallback} />
        ];
    }
}