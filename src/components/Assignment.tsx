"use client"

import React, { useState } from 'react';
import { Progress } from './ui/progress';
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoArrowUndo, IoArrowRedo } from "react-icons/io5";

const Assignment = () => {
    const [number, setNumber] = useState<number>(0);
    const [history, setHistory] = useState<number[]>([0]);
    const [historyIndex, setHistoryIndex] = useState<number>(0);

    const updateNumber = (newValue: number) => {
        if (newValue >= 0 && newValue <= 150) {
            const updatedHistory = [...history.slice(0, historyIndex + 1), newValue];
            setHistory(updatedHistory);
            setHistoryIndex(updatedHistory.length - 1);
            setNumber(newValue);
        }
    };

    const increment = () => {
        updateNumber(number + 1);
    };

    const decrement = () => {
        updateNumber(number - 1);
    };

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setNumber(history[historyIndex - 1]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setNumber(history[historyIndex + 1]);
        }
    };

    const getNumberColor = (num: number) => {
        if (num < 10 || num > 140) return 'text-red-500';
        if (num < 35) return 'text-yellow-500';
        if (num < 88) return 'text-blue-500';
        return 'text-green-500';
    }

    return (
        <main className='lg:w-1/2 md:w-2/3 w-[80%] p-6 mx-auto my-10 rounded bg-gray-700'>
            
            <div className=' flex justify-between items-center px-2'>
                <span className='font-semibold text-white bg-gray-800 text-sm px-2 py-1 rounded'>Max: 150</span>
                <span className='text-xl flex gap-2'>
                    <button onClick={undo} className='text-white'><IoArrowUndo /></button>
                    <button onClick={redo} className='text-white'><IoArrowRedo /></button>
                </span>
            </div>

            <div className='my-4 mt-8'>
                <Progress value={(number / 150) * 100} />
            </div>

            <div className={`text-center text-4xl mb-4 font-bold ${getNumberColor(number)} border-b pb-2`}>
                {number}
            </div>

            <div className='w-full flex items-center justify-between'>
                <button
                    className="px-4 py-3 rounded-full  bg-gray-600  text-white shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 active:scale-95 transition-transform duration-150 mr-3"
                    onClick={decrement}
                >
                    <FaMinus />
                </button>

                <button
                    className="px-4 py-3 rounded-full text-white bg-gray-800 shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 active:scale-95 transition-transform duration-150 ml-3"
                    onClick={increment}
                >
                    <FaPlus />
                </button>
            </div>
        </main>
    );
};

export default Assignment;
