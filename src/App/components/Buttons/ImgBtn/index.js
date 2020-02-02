import React from 'react';
import styled from "styled-components";

const Btn = styled.div`
    width : 100px;
    height : 100px;
    margin : 5px;
    display : flex;
    align-items: center;
    justify-content : center;
    border : 1px solid #fff;
    
    :hover {
        cursor : pointer;
    }
    
    ${props => props.status ? 'border : 2px solid red;' : ':hover {border : 1px solid #000;}'}
    
`;

const Img = styled.img`
    width : 100px;
    height : 100px;
`;

export const ImgBtn = ({name,img,status,onClick}) => (
    <Btn status={status}>
        <Img name={name} src={img} alt={name} onClick={onClick}/>
    </Btn>
);
