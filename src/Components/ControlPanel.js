import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const GameplayButton = styled.button`
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

const RenderGamePlayPanel = (props) => {
    return [
            <GameplayButton onClick={props.onStartPauseClicked}>{props.paused ? 'Play' : 'Pause' }</GameplayButton>,
            <ResetButton>Reset</ResetButton>
    ];
};

const RenderGameOverPanel = (props) => {
    return (
        <GameplayButton onClick={props.onResetGameClicked}>Play again</GameplayButton>
    );
};

const ControlPanel = (props) => {
    return (
        <Layout>
            <Container>
                <p>Score: {props.score}</p>
            </Container>
            <Container>
                { props.gameOver ?  RenderGameOverPanel(props) : RenderGamePlayPanel(props) }
            </Container>
        </Layout>
    );
}

export default ControlPanel;