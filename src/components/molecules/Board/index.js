import Axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { 
    GroupCard, 
    GroupTitle,
    GroupDescription,
    ItemContent,
    ItemName,
    ItemFooter
} from './BoardStyle';
import { ActionDropdown, ActionContainer, ActionItem } from '../../../../styles/GlobalStyles';
import { 
    Spin, 
    Progress, 
    Modal,
    Input,
    Button
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
import { Todos, getItems, createItems } from '../../../../services';

const Board = () => {
    const [todosList, setTodosList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [actionToggle, setActionToggle] = useState(false);
    const [token, setToken] = useState(null);
    const [editModalToggle, setEditModalToggle] = useState(false);
    const [addModalToggle, setAddModalToggle] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [newPrecentage, setNewPrecentage] = useState('');
    const [activeAddTodoId, setActiveAddTodoId] = useState(null)

    const handleActionToggle = () => {
        setActionToggle(!actionToggle);
    }

    const handleAddModalToggle = (id) => {
        setActiveAddTodoId(id)
        setAddModalToggle(!addModalToggle)
    }

    const addNewTask = () => {
        const params = {
            name: newTask,
            progress_percentage: newPrecentage
        }

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        }

        Axios.post(
            createItems(activeAddTodoId),
            params,
            config
        )
        .then(res => {
            fetchTodos();
            setAddModalToggle(false);
        })
        .catch(error => {
            console.log(error, 'ERROR')
        })
    }

    const fetchTodos = () => {
        setIsLoading(true);
        Axios.get(
            Todos.fetchAll,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
            }
        )
        .then(res => {
            res.data.forEach((todo, index) => {
                fetchItems(todo.id, index, res.data)
            })
        })
        .catch(error => {
            console.log(error, 'ERROR')
        })
    }

    const fetchItems = async (id, index, todoData) => {
        setIsLoading(true);
        await Axios.get(
            getItems(id),
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
            }
        )
        .then(res => {
            const existingList = todoData 
            existingList[index].items = res.data
            setTodosList(existingList)
            console.log(existingList,'existing')
        })
        .catch(error => {
            console.log(error, 'ERROR')
        })
        .finally(_ => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        const tokenStorage = localStorage.getItem('auth_token');

        if (tokenStorage) {
            setToken(tokenStorage);
            fetchTodos();
        }
    }, [])

    if(!token) {
        return (
            <div className="p-20 bg-white flex justify-center">
                <p>You need to log in first <Link href="/auth">Here</Link></p>
            </div>
        )
    } 

    if(isLoading) {
        return (
            <div className="p-20 bg-white flex gap-4 justify-center">
                <Spin /> 
            </div>
        )
    }

    if(!isLoading && todosList.length >= 1) {
        return (
            <div className="p-20 bg-white flex gap-4 items-start">
                {todosList.map((todo, todoIndex) => {
                    return (
                        <GroupCard key={ todoIndex }>
                            <GroupTitle>
                                { todo.title }
                            </GroupTitle>
                            <GroupDescription>{ todo.description }</GroupDescription>
                            {todo.items ? (
                                todo.items.map((item, itemIndex) => {
                                    return (
                                        <ItemContent key={itemIndex}>
                                            <ItemName>{item.name}</ItemName>
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
                                        </ItemContent>
                                    )
                                })
                            ) : (
                                <ItemContent>
                                    <ItemName>No Task</ItemName>
                                </ItemContent>
                            )}
                            <ActionItem onClick={() => handleAddModalToggle(todo.id)}>
                                <FontAwesomeIcon icon={faCirclePlus}/>
                                <span>New Task</span>
                            </ActionItem>
                        </GroupCard>
                    )
                })}

                <Modal
                    title="Create Task"
                    centered
                    open={addModalToggle}
                    onCancel={() => setAddModalToggle(false)}
                    footer={[
                        <Button key="back" onClick={() => setAddModalToggle(false)}>
                          Cancel
                        </Button>,
                        <Button key="submit" loading={isLoading} onClick={addNewTask}>
                          Save Task
                        </Button>
                      ]}
                >
                    <div className="my-2">
                        <label>Task Name :</label>
                        <Input placeholder="Task Name" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                    </div>
                    <div className="my-2">
                        <label>Progress :</label>
                        <Input placeholder="Task Name" value={newPrecentage} onChange={(e) => setNewPrecentage(e.target.value)} />
                    </div>
                </Modal>
            </div>
        )
    }

}

export default Board;