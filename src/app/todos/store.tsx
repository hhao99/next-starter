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
    validationError: string | null;
    addTodo(input: TodoInput): boolean;
    deleteTodo(id: string): void;
    toggleTodo(id: string): void;
}

const initialTodos = [
    { id: '1', title: 'first test task', completed: false },
    { id: '2', title: 'second test task', completed: true }
];
export const useTodoStore = create<TodoState>((set) => ({
    list: [...initialTodos],
    validationError: null,
    addTodo: (input: TodoInput) => {
        const result = TodoInputSchema.safeParse(input);
        if (!result.success) {
            const errorMessage = result.error.message || 'invalide input';
            set({ validationError: errorMessage });
            return false;
        } else {
            const newTodo = {
                id: crypto.randomUUID(),
                title: result.data.title,
                completed: false
            };
            set((state) => ({
                validationError: null,
                list: [...state.list, newTodo]
            }));
            return true;
        }
    },
    deleteTodo: (id: string) => {},
    toggleTodo: (id: string) => {}
}));
