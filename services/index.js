export const Auth = {
    signIn: 'https://todo-api-18-140-52-65.rakamin.com/auth/login',
    signUp: 'https://todo-api-18-140-52-65.rakamin.com/signup'
}

export const Todos = {
    fetchAll: 'https://todo-api-18-140-52-65.rakamin.com/todos',
    create: 'https://todo-api-18-140-52-65.rakamin.com/todos'
}

export const getItems = (id) => {
    return `https://todo-api-18-140-52-65.rakamin.com/todos/${id}/items`
}

export const createItems = (id) => {
    return `https://todo-api-18-140-52-65.rakamin.com/todos/${id}/items`
}

export const patchItem = (id, target_id) => {
    return `https://todo-api-18-140-52-65.rakamin.com/todos/${id}/items/${target_id}`
}

export const deleteItem = (id, item_id) => {
    return `https://todo-api-18-140-52-65.rakamin.com/todos/${id}/items/${item_id}`
}