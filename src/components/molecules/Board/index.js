import Axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { 
    GroupCard, 
    GroupTitle,
    GroupDescription
} from './BoardStyle';
import { ActionItem } from '../../../../styles/GlobalStyles';
import { 
    Spin,
    notification
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faCirclePlus 
} from '@fortawesome/free-solid-svg-icons'
import Items from '../Items';
import ActionModal from '../ActionModal';
import { Todos, getItems, createItems, patchItem, deleteItem } from '../../../../services';

const Board = () => {
    const [todosList, setTodosList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [modalToggle, setModalToggle] = useState(false);
    const [taskName, setTask] = useState('');
    const [taskPrecentage, setPrecentage] = useState('');
    const [activeTodoId, setActiveTodoId] = useState(null);
    const [activeItemId, setActiveItemId] = useState(null);
    const [modalMode, setModalMode] = useState(null);

    const handleActionModalToggle = (id, mode, itemId, editValue) => {
        setActiveTodoId(id)
        setModalMode(mode)
        setModalToggle(!modalToggle)

        if(mode == 'edit'){
            setTask(editValue.name);
            setPrecentage(editValue.progress_percentage);
            setActiveItemId(itemId);
        }
    }

    const openNotification = (error) => {
        notification.error({
            message: 'Error',
            description: error.message
        });
    };

    const moveItem = (currentTodoId, targetTodoId, itemId, itemName) => {
        const editParams = {
            target_todo_id: targetTodoId,
            name: itemName,
        }

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        }

        Axios.patch(
            patchItem(currentTodoId, itemId),
            editParams,
            config
        )
        .then(res => {
            fetchTodos();
        })
        .catch(error => {
            openNotification(error.response)
        })
    }

    const deleteItem = (todoId, itemId) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        }

        Axios.delete(
            deleteItem(todoId, itemId),
            config
        )
        .then(res => {
            fetchTodos();
        })
        .catch(error => {
            openNotification(error.response)
        })
    }

    const submitTask = () => {
        const params = {
            name: taskName,
            progress_percentage: taskPrecentage
        }

        const editParams = {
            target_todo_id: activeTodoId,
            name: taskName,
            progress_percentage: taskPrecentage
        }

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        }

        if(modalMode == 'edit') {
            Axios.patch(
                patchItem(activeTodoId, activeItemId),
                editParams,
                config
            )
            .then(res => {
                fetchTodos();
                setModalToggle(false);
                setTask('')
                setPrecentage('')
            })
            .catch(error => {
                openNotification(error.response)
            })
        } else {
            Axios.post(
                createItems(activeTodoId),
                params,
                config
            )
            .then(res => {
                fetchTodos();
                setModalToggle(false);
                setTask('')
                setPrecentage('')
            })
            .catch(error => {
                openNotification(error.response)
            })
        }
    }

    const fetchTodos = async () => {
        setIsLoading(true);
        await Axios.get(
            Todos.fetchAll,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
            }
        )
        .then(res => {
            res.data.forEach(async (todo, index) => {
                await fetchItems(todo.id, index, res.data)
            })
        })
        .catch(error => {
            openNotification(error.response)
        })
        .finally(_ => {
            setTimeout(() => {
                setIsLoading(false);
            }, 400)
        }) 
    }

    const fetchItems = async (id, index, todoData) => {
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
        })
        .catch(error => {
            openNotification(error.response)
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
                <p>You need to log in first <Link href="/login" legacyBehavior><a style={{ color: 'blue', textDecoration: 'underline' }}>Here</a></Link></p>
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

    if(!isLoading) {
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
                                        <Items 
                                            key={itemIndex} 
                                            item={item} 
                                            itemIndex={itemIndex}
                                            todoIndex={todoIndex}
                                            todosList={todosList}
                                            handleActionModalToggle={handleActionModalToggle}
                                            moveItem={moveItem}
                                            deleteItem={deleteItem}
                                        />
                                    )
                                })
                            ) : (
                                <Items item={[]} />
                            )}
                            <ActionItem onClick={() => handleActionModalToggle(todo.id, 'add')}>
                                <FontAwesomeIcon icon={faCirclePlus}/>
                                <span>New Task</span>
                            </ActionItem>
                        </GroupCard>
                    )
                })}

                <ActionModal
                    mode={modalMode}
                    todoId={activeTodoId}
                    taskName={taskName}
                    taskPrecentage={taskPrecentage}
                    setTask={setTask}
                    setPrecentage={setPrecentage}
                    submitTask={submitTask}
                    modalToggle={modalToggle}
                    setModalToggle={setModalToggle}
                />
            </div>
        )
    }

}

export default Board;