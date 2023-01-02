import styled from "styled-components";
import { Card, Button } from "antd";

export const GroupCard = styled(Card)`
    width: 300px;
    background-color: #F7FEFF;
    border: solid 1px #01959F;
`;

export const GroupTitle = styled.h3`
    color: #01959F;
    border: solid 1px #4DB5BC;
    font-size: 12px;
    padding: 4px;
    border-radius: 5px;
    width: fit-content;
`;

export const GroupDescription = styled.p`
    font-size: 12px;
    font-weight: bold;
    line-height: 20px;
    margin-top: 8px;
`;


export const AddGroupButton = styled(Button)`
    background-color: #01959F;
    margin-left: 8px;
    color: #fff;
    &:hover {
        background-color: #01849F
        color: #fff;
    }

    &:focus {
        background-color: #01849F
        color: #fff;
        border: none;
    }
`;