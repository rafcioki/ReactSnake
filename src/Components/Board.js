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

const Board = (props) => {
    return (
        <Table>
            <tbody>
                {
                    props.board.map(row => {
                        return (<tr>
                            { row.map(column => {
                                return column === '' ? <StandardTile></StandardTile> : <SnakeTile></SnakeTile>
                            }) }
                        </tr>)
                    })
                }
            </tbody>
        </Table>
    );
}

export default Board;