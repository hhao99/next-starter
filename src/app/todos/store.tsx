import { z } from 'zod';
import { create } from 'zustand';

export const TodoSchema = z.object({
    id: z.string(),
    title: z.string().min(4, 'todo task need to be more than 4 letters'),
    completed: z.boolean()
});
export const TodoInputSchema = TodoSchema.pick({ title: true });

export type Todo = z.infer<typeof TodoSchema>;
export type TodoInput = z.infer<typeof TodoInputSchema>;

interface TodoState {
    list: Todo[];
    error: string | null;
    isloading: boolean;
    fetchTodos(): void;
    addTodo(input: TodoInput): void;
    deleteTodo(id: string): void;
    toggleTodo(id: string): void;
}

const initialTodos = [
    { id: '1', title: 'first test task', completed: false },
    { id: '2', title: 'second test task', completed: true }
];

const base_url = 'http://localhost:3001/todos';
export const useTodoStore = create<TodoState>((set) => ({
    list: [],
    isloading: false,
    error: null,
    fetchTodos: async () => {
        set(() => ({ list: [], isloading: true }));
        const data = await fetch(base_url);
        const todos = await data.json();
        set(() => ({ isloading: false, list: todos }));
    },
    addTodo: async (input: TodoInput) => {
        try {
            const validatedInput = TodoInputSchema.parse(input);
            const new_todo = {
                id: crypto.randomUUID(),
                title: validatedInput.title,
                completed: false
            };
            const response = await fetch(base_url, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(new_todo)
            });
            if (!response.ok) {
                throw Error('failed to create Todo');
            }
            const data = await response.json();
            const todo = TodoSchema.parse(data);

            set((state) => ({ ...state, isloading: false, list: [...state.list, todo] }));
        } catch (err) {
            console.log(err);
            set((state) => ({ ...state, error: err.message, isloading: false }));
        }
    },
    deleteTodo: (id: string) => {},
    toggleTodo: (id: string) => {}
}));
