import React from 'react';
import styled from "styled-components";

const Btn = styled.button`
    width : 200px;
    height : 50px;
    background : white;
    font-size : 16px;
    margin : 15px;
`;

export const SimpleBtn = ({name,onClick}) =>(
    <Btn name={name} onClick={onClick}>{name}</Btn>
);
