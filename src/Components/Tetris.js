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

        this.onTick = this.onTick.bind(this);
        this.onStartPauseClickedCallback = this.onStartPauseClickedCallback.bind(this);
        this.onStartPauseStateChanged = this.onStartPauseStateChanged.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyPressed, false);
    }

    onKeyPressed(e) {
        const key = e.key;

        if (key === 'ArrowUp' && this.direction !== 'down') {
            this.direction = 'up';
        } else if (key === 'ArrowDown' && this.direction !== 'up') {
            this.direction = 'down';
        } else if (key === 'ArrowLeft' && this.direction !== 'right') {
            this.direction = 'left';
        } else if (key === 'ArrowRight' && this.direction !== 'left') {
            this.direction = 'right';
        }
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
        console.log('callback');
        this.setState((prevState, props) => ({
            paused: !prevState.paused
        }), this.onStartPauseStateChanged );
    }

    onStartPauseStateChanged() {
        if (!this.state.paused) {
            this.timerId = setInterval(this.onTick, 300);
        } else {
            clearInterval(this.timerId);
        }
    }

    onTick() {
        if (!this.state.paused) {
            this.tryToMoveSnake();
        }
    }

    tryToMoveSnake() {
        if (this.checkCollision()) {
            // handle collision
        } else {
            this.moveSnake();
        }
    }

    moveSnake() {
        console.log('moving snake');
        this.snakePositions.shift();
        const firstTile = this.snakePositions[this.snakePositions.length - 1];
        let firstX = firstTile.x, firstY = firstTile.y;

        switch (this.direction) {
            case 'right':
                if (firstY === this.mapSize - 1) {
                    firstY = 0;
                } else {
                    ++firstY;
                }

                break;

            case 'left':
                if (firstY === 0) {
                    firstY = this.mapSize - 1;
                } else {
                    --firstY;
                }

                break;

            case 'up':
                if (firstX === 0) {
                    firstX = this.mapSize - 1;
                } else {
                    --firstX;
                }

                break;

            case 'down':
                if (firstX === this.mapSize - 1) {
                    firstX = 0;
                } else {
                    ++firstX;
                }

                break;
        }

        this.snakePositions.push({ x: firstX, y: firstY });

        this.setState({
            board: this.createBoardSyncedWithSnakePositions()
        });
    }

    checkCollision() {
        return false;
    }

    render () {
        return [
                <Board board={this.state.board} />,
                <ControlPanel paused={this.state.paused} onStartPauseClicked={this.onStartPauseClickedCallback} />
        ];
    }
}