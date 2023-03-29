import { TodosAccess } from '../DataLayer/todosAcess'
import { Attachmentutils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
//import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'


const logger = createLogger('Todoaccess')
const attachmentutils = new Attachmentutils()
const todosAccess = new TodosAccess()

//the function to get all the todo items for a user
export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    logger.info('getTodosForUser', {userId})
    return await todosAccess.getAllTodos(userId)
}

//write the function to create a new todo item
export async function createTodo(
    newTodo: CreateTodoRequest,
    userId: string
):    Promise<TodoItem> {
    logger.info('createTodo', {newTodo, userId})
    
    const todoId = uuid.v4()
    const createdAt = new Date().toISOString()
    const s3attachmenturl = attachmentutils.getAttachmentUrl(todoId)
    const newItem = {
        userId,
        todoId,
        createdAt,
        done: false,
        attachmentUrl: s3attachmenturl,
        ...newTodo
    }
return await todosAccess.createTodoItem(newItem)    
}
