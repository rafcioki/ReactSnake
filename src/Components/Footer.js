import React from 'react';
import styled from 'styled-components';

const FooterContent = styled.div`
    display: flex;
    justify-content: center;
    line-height: 1em;
    overflow: hidden;
    padding: 5px;
`;

const Link = styled.a`
    color: 	#FF5800;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const Footer = () => {
    return (
        <footer>
            <FooterContent>
                <span>
                    Built with <Link href="https://reactjs.org/">ReactJS</Link> and <Link href="https://www.styled-components.com/">Styled Components</Link>.
                </span>
            </FooterContent>
            <FooterContent>
                <span>
                    <Link href="https://github.com/">Code on GitHub</Link>
                </span>
            </FooterContent>
        </footer>
    );
}

export default Footer;