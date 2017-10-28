import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
    border: 1px solid;
    margin: auto;
    border-spacing: 0;
`;

const SnakeTile = styled.td`
    background-color: #6ae708;
    height: 15px;
    width: 15px;
    border: 1px solid black;
`;

const StandardTile = styled.td`
    background-color: black;
    height: 15px; 
    width: 15px;
`;

const AppleTile = styled.td`
    background-color: red;
    height: 15px; 
    width: 15px;
`;

const createEmptyTwoDimensionalArray = () => {
    const board = [];

    for (let i = 0; i < 20; ++i) {
        board.push([]);

        for (let j = 0; j < 20; ++j) {
            board[i].push('');
        }
    }

    return board;
}

const createBoard = (snake, apple) => {
    const board = createEmptyTwoDimensionalArray();
    
    for (let i = 0; i < snake.length; ++i) {
        const x = snake[i].x;
        const y = snake[i].y;

        board[x][y] = 's';
    }

    board[apple.x][apple.y] = 'a';

    return board;
}

const getTileFor = (value) => {
    if (value === 's') {
        return <SnakeTile></SnakeTile>;
    } else if (value === 'a') {
        return <AppleTile></AppleTile>;
    }

    return <StandardTile></StandardTile>;
}

const Board = (props) => {
    return (
        <Table>
            <tbody>
                {
                    createBoard(props.snake, props.apple).map(row => {
                        return (<tr>
                            { row.map(column => {
                                return getTileFor(column);
                            }) }
                        </tr>)
                    })
                }
            </tbody>
        </Table>
    );
}

export default Board;