import { 
    ItemContent, 
    ItemName,
    ItemFooter 
} from './ItemStyle';
import { ActionDropdown, ActionContainer, ActionItem } from '../../../../styles/GlobalStyles';
import { 
    Progress,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEllipsis, 
    faTrash, 
    faArrowRight, 
    faArrowLeft, 
    faPenToSquare, 
    faCirclePlus 
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const Items = ({ item, todoIndex, todosList, handleActionModalToggle, moveItem, deleteItem }) => {
    const [actionToggle, setActionToggle] = useState(false);

    const handleActionToggle = () => {
        setActionToggle(!actionToggle);
    }

    const handleEditModalToggle = () => {
        setActionToggle(false);
        handleActionModalToggle(todosList[todoIndex].id, 'edit', item.id, item);
    }



    return (
        <ItemContent>
            <ItemName>{item.name}</ItemName>
            { item ? (
                <ItemFooter>
                    <Progress percent={item.progress_percentage} size="small" />
                    <ActionContainer>
                        <FontAwesomeIcon icon={faEllipsis} style={{ color: '#757575', cursor: 'pointer' }} onClick={handleActionToggle} />
                        {actionToggle ? (
                            <ActionDropdown>
                                {todoIndex == todosList.length - 1 ? (
                                    <></>
                                ) : (
                                    <ActionItem onClick={() => moveItem(todosList[todoIndex].id, todosList[todoIndex+1].id, item.id, item.name)}>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                        <span>Move Right</span>
                                    </ActionItem>
                                )}

                                {todoIndex == 0 ? (
                                    <></>
                                ) : (
                                    <ActionItem onClick={() => moveItem(todosList[todoIndex].id, todosList[todoIndex-1].id, item.id, item.name)}>
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                        <span>Move Left</span>
                                    </ActionItem>
                                )}
                                <ActionItem onClick={() => deleteItem(todosList[todoIndex].id, item.id)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                    <span>Delete</span>
                                </ActionItem>
                                <ActionItem onClick={handleEditModalToggle}>
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                    <span>Edit</span>
                                </ActionItem>
                            </ActionDropdown>
                        ) : (
                            <></>
                        )}
                    </ActionContainer>
                </ItemFooter>
            ) : (
                <ItemName>No Task</ItemName>
            )}
        </ItemContent>
    )
}

export default Items;