import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import Tetris from './Components/Tetris';
import Footer from './Components/Footer';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const BodyContainer = styled.div`
    flex: 1 0 auto;
    padding: 20px;
`;

class App extends Component {
  render() {
    return (
      <Layout>
        <BodyContainer>
          <Tetris />
        </BodyContainer>
        <Footer />
      </Layout>
    );
  }
}

export default App;
