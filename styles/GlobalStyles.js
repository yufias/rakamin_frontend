import styled from "styled-components";

export const ActionContainer = styled.div`
    display: inline-block;
    position: relative;

`;

export const ActionDropdown = styled.div`
    display: block;
    position: absolute;
    overflow: auto;
    background-color: #fff;
    border: 1px solid #cccaca;
    border-radius: 5px;
    padding: 8px;
    font-size: 12px;
    width: 200px;
`;

export const ActionItem = styled.p`
    display: flex;
    gap: 4px;
    margin: 8px 2px;
    align-items: center;
    cursor: pointer;
    color: #333333;
    &:hover {
        color: #01959F;
    }
`;