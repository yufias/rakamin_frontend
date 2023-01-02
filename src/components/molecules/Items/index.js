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

const Items = ({ item, todoIndex, todosList }) => {
    const [actionToggle, setActionToggle] = useState(false);

    const handleActionToggle = () => {
        setActionToggle(!actionToggle);
    }
    return (
        <ItemContent>
            <ItemName>{item.name}</ItemName>
            { item !== undefined ? (
                <ItemFooter>
                    <Progress percent={item.progress_percentage} size="small" />
                    <ActionContainer>
                        <FontAwesomeIcon icon={faEllipsis} style={{ color: '#757575', cursor: 'pointer' }} onClick={handleActionToggle} />
                        {actionToggle ? (
                            <ActionDropdown>
                                {todoIndex == todosList.length - 1 ? (
                                    <></>
                                ) : (
                                    <ActionItem>
                                        <FontAwesomeIcon icon={faArrowRight}/>
                                        <span>Move Right</span>
                                    </ActionItem>
                                )}

                                {todoIndex == 0 ? (
                                    <></>
                                ) : (
                                    <ActionItem>
                                        <FontAwesomeIcon icon={faArrowLeft}/>
                                        <span>Move Left</span>
                                    </ActionItem>
                                )}
                                <ActionItem>
                                    <FontAwesomeIcon icon={faTrash}/>
                                    <span>Delete</span>
                                </ActionItem>
                                <ActionItem onClick={() => setEditModalToggle(!editModalToggle)}>
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