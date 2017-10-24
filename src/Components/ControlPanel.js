import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center;
`;

const StartStopButton = styled.button`
    font-family: Arial;
    color: #ffffff;
    font-size: 15px;
    background: #3498db;
    padding: 10px;
    text-decoration: none;
    border: none;
    margin-right: 5px;
    cursor: pointer;
`;

const ResetButton = styled.button`
    font-family: Arial;
    color: #ffffff;
    font-size: 15px;
    background: red;
    padding: 10px;
    text-decoration: none;
    border: none;
    cursor: pointer;
`;

const ControlPanel = (props) => {
    return (
        <Container>
            <StartStopButton>{props.paused ? 'Play' : 'Pause' }</StartStopButton>
            <ResetButton>Reset</ResetButton>
        </Container>
    );
}

export default ControlPanel;