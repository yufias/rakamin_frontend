import styled from "styled-components";

export const ItemContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #E0E0E0;
    border-radius: 4px;
    padding: 10px;
    margin-top: 12px;
`;

export const ItemName = styled.p`
    font-size: 14px;
    line-height: 24px;
    font-weight: bold;
`;

export const ItemFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;