import React, { Component } from 'react';
import styled from 'styled-components';
import Board from './Board';
import ControlPanel from './ControlPanel';
import getRandomInt from '../Utils/Random';

const GameContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const DefaultMapSize = 20;
const PointsIncrement = 10;

export default class Tetris extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();

        this.onTick = this.onTick.bind(this);
        this.onStartPauseClickedCallback = this.onStartPauseClickedCallback.bind(this);
        this.onStartPauseStateChanged = this.onStartPauseStateChanged.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onGameResetClickedCallback = this.onGameResetClickedCallback.bind(this);
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyPressed, false);
    }

    getInitialState(isPausedWhenStarted = true) {
        const initialSnake = this.createInitialSnake();

        return {
            direction: 'right',
            nextDirection: null,
            snake: this.createInitialSnake(),
            gameOver: false,
            paused: isPausedWhenStarted,
            score: 0,
            apple: this.createNewApple(initialSnake)
        };
    }

    createInitialSnake() {
        const snake = [];

        snake.push({ x: 4, y: 4 });
        snake.push({ x: 4, y: 5 });
        snake.push({ x: 4, y: 6 });

        return snake;
    }

    createNewApple(snake) {
        let appleX, appleY;

        do {
            appleX = getRandomInt(0, DefaultMapSize - 1);
            appleY = getRandomInt(0, DefaultMapSize - 1);
        } while (this.snakeContains(snake, { x: appleX, y: appleY }));

        return {
            x: appleX,
            y: appleY
        };
    }

    snakeContains(snake, position) {
        return snake.filter(pos => pos.x === position.x && pos.y === position.y).length > 0;
    }

    onKeyPressed(e) {
        const key = e.key;

        this.setState(prevState => {
            if (prevState.nextDirection) {
                return;
            }

            const currentDirection = prevState.direction;
            let newDirection = currentDirection;
    
            if (key === 'ArrowUp') {
                newDirection = 'up';
            } else if (key === 'ArrowDown') {
                newDirection = 'down';
            } else if (key === 'ArrowLeft') {
                newDirection = 'left';
            } else if (key === 'ArrowRight') {
                newDirection= 'right';
            }
    
            if (newDirection !== currentDirection) {
                return {
                    nextDirection: newDirection
                }
            }
        });
    }

    onStartPauseClickedCallback() {
        this.setState((prevState, props) => ({
            paused: !prevState.paused
        }), this.onStartPauseStateChanged );
    }

    onGameResetClickedCallback() {
       this.setState(this.getInitialState(false));
    }

    onStartPauseStateChanged() {
        if (!this.state.paused) {
            this.timerId = setInterval(this.onTick, 150);
        } else {
            clearInterval(this.timerId);
        }
    }

    onTick() {
        if (!this.state.paused) {
            this.changeDirection();
            this.tryToMoveSnake();
        }
    }

    changeDirection() {
        this.setState(prevState => {
            if (!prevState.nextDirection) {
                return;
            }

            let newDirection = prevState.nextDirection;
            const currentDirection = prevState.direction;

            if (newDirection === 'up' && currentDirection === 'down'
                || newDirection === 'down' && currentDirection === 'up'
                || newDirection === 'right' && currentDirection === 'left'
                || newDirection === 'left' && currentDirection === 'right') {
                    return {
                        nextDirection: null
                    };
                }

            return {
                direction: newDirection,
                nextDirection: null
            }
        });
    }

    tryToMoveSnake() {
        this.setState(prevState => {
            const newHead = this.getNewHead(prevState.direction, prevState.snake);

            if (this.checkCollision(prevState.snake, newHead)) {
                return {
                    gameOver: true,
                    paused: true
                };
            } else {
                const movedSnake = this.getMovedSnake(prevState.snake, newHead);

                if (this.tryToEatApple(movedSnake, prevState.apple)) {
                    const enlargedSnake = this.enlargeSnake(prevState.apple, movedSnake);

                    return {
                        apple: this.createNewApple(movedSnake),
                        score: prevState.score + PointsIncrement,
                        snake: enlargedSnake
                    };
                }

                return {
                    snake: movedSnake
                };
            }
        });
    }

    checkCollision(snake, newHead) {
        return this.snakeContains(snake, newHead);
    }

    tryToEatApple(snake, apple) {
        return this.snakeContains(snake, apple);
    }

    getNewHead(direction, snake) {
        const firstTile = snake[snake.length - 1];
        let firstX = firstTile.x, firstY = firstTile.y;

        switch (direction) {
            case 'right':
                if (firstY === DefaultMapSize - 1) {
                    firstY = 0;
                } else {
                    ++firstY;
                }

                break;

            case 'left':
                if (firstY === 0) {
                    firstY = DefaultMapSize - 1;
                } else {
                    --firstY;
                }

                break;

            case 'up':
                if (firstX === 0) {
                    firstX = DefaultMapSize - 1;
                } else {
                    --firstX;
                }

                break;

            case 'down':
                if (firstX === DefaultMapSize - 1) {
                    firstX = 0;
                } else {
                    ++firstX;
                }

                break;

            default:
                alert('Direction should always be set.');
        }

        return {
            x: firstX,
            y: firstY
        };
    }

    getMovedSnake(originalSnake, newHead) {
        return [...originalSnake.slice(1, originalSnake.length), newHead];
    }

    enlargeSnake(apple, snake) {
        return [apple, ...snake];
    }

    render () {
        return [
                <Board snake={this.state.snake} apple={this.state.apple} />,
                <ControlPanel
                    paused={this.state.paused}
                    gameOver={this.state.gameOver}
                    score={this.state.score}
                    onStartPauseClicked={this.onStartPauseClickedCallback}
                    onResetGameClicked={this.onGameResetClickedCallback} />
        ];
    }
}