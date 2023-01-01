import Axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { 
    GroupCard, 
    GroupTitle,
    GroupDescription,
    ItemContent
 } from './BoardStyle';
import { Spin, Alert } from 'antd';
import { Todos, getItems } from '../../../../services';

const Board = () => {
    const [todosList, setTodosList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null)

    const fetchTodos = async () => {
        setIsLoading(true);
        await Axios.get(
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
                {todosList.map((todo, index) => {
                    return (
                        <GroupCard key={ index }>
                            <GroupTitle>
                                { todo.title }
                            </GroupTitle>
                            <GroupDescription>{ todo.description }</GroupDescription>
                            {todo.items ? (
                                todo.items.map((item, index) => {
                                    return (
                                        <ItemContent key={index}>
                                            <p>{item.name}</p>
                                        </ItemContent>
                                    )
                                })
                            ) : (
                                ''
                            )}
                        </GroupCard>
                    )
                })}
            </div>
        )
    }

}

export default Board;