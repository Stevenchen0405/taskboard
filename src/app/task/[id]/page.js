'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function TaskDetail([params]) {
    const router = useRouter();
    const { id } = params;
    const[title,settitle]=useState('');
    const[description,setdescription]= useState('') ;
    const handleSave = ()=>{
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = savedTasks.map((task) =>
            task.id === Number(id) ? {...task,title,description} : task );
        localStorage.setItem('tasks',JSON.stringify(updatedTasks));
        router.push('/');
    }
    useEffect(()=>{
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = savedTasks.find((t)=>t.id === Number(id));
        if(tasj){
            settitle(task.title);
            setdescription(task.description);

        }
    }, [id])

    return (
        <main className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                task details
            </h1>
            <input
                className="border p-2 w-full mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title" />
            <textarea
                className="border p-2 w-full mb-4"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder="description"
                rows={4} />
            <button
                className="bg-green-500 text-white px-4 py-4"
                onClick={handleSave}
            >

            </button>
        </main>
    )


}