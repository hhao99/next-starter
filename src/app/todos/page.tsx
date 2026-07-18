'use client';
import { useEffect, useState } from 'react';

// shadcn
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { useTodoStore } from './store';

export default function Home() {
    const store = useTodoStore();
    const todos = useTodoStore((state) => state.list);
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        store.addTodo({ title });
        setTitle('');
    };

    useEffect(() => {
        const fetchData = async () => {
            await store.fetchTodos();
        };
        fetchData();
    }, []);
    return (
        <>
            <h3>Todo App</h3>
            <Separator />
            <form onSubmit={(e) => handleSubmit(e)}>
                <Label htmlFor='title'>New Task:</Label>
                <Input type='text' placeholder='new task' value={title} onChange={(e) => setTitle(e.target.value)} />
            </form>
            {store.validationError && <p className='text-lg text-red-600'>{store.validationError}</p>}
            <Separator />
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </>
    );
}
