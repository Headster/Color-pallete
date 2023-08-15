import styled from 'styled-components';

export const Wrapper = styled.div`
    
`;

export const DownloadBtn = styled.a`
    position: absolute;
    top: 30px;
    right: 30px;
    background: white;
    border: 1px solid black;
    border-radius: 10px;
    padding: 15px 30px;
    cursor: pointer;
    text-decoration: none;
    color: black;
    &:hover {
        background: lightgray;
    }
`;