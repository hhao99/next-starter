'use client';
import { useState } from 'react';

// shadcn
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { useTodoStore } from './store';

export default function Home() {
    const store = useTodoStore();
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        store.addTodo({ title });
        setTitle('');
    };
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
                {store.list.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </>
    );
}
