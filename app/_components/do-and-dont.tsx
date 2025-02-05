import Link from 'next/link'
import React from 'react'

export const DoAndDont = (props: { dos: string[], donts: string[] }) => {

    const doItem = (item: string) => {
        return (<li className='flex items-center min-h-12 mt-1'>
            <div>
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" width="34" height="34">
                    <path stroke-width="4" stroke-linecap="round" d="M18.4 7.8l-8.5 8.4L5.6 12" stroke="#007f3b"></path>
                </svg>
            </div>
            {item}
        </li>)
    }

    const dontItem = (item: string) => {
        return (<li className='flex items-center min-h-12 mt-1'>
            <div>
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="34" height="34">
                    <path d="M17 18.5c-.4 0-.8-.1-1.1-.4l-10-10c-.6-.6-.6-1.6 0-2.1.6-.6 1.5-.6 2.1 0l10 10c.6.6.6 1.5 0 2.1-.3.3-.6.4-1 .4z" fill="#d5281b"></path>
                    <path d="M7 18.5c-.4 0-.8-.1-1.1-.4-.6-.6-.6-1.5 0-2.1l10-10c.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1l-10 10c-.3.3-.6.4-1 .4z" fill="#d5281b"></path>
                </svg>
            </div>
            {item}
        </li>)
    }


    return (
        <>
            <div className="bg-[#eff4f5] border border-[#d8dde0] mt-12">
                <h3 className="bg-blue-500 text-white p-2 w-100px top-[-1rem] relative left-0 inline-block pl-6 pr-6 text-2xl font-semibold">Do</h3>
                <ul className="p-4" role="list">
                    {props.dos.map(item => doItem(item))}
                </ul>
            </div>

            <div className="bg-[#eff4f5] border border-[#d8dde0] mt-12 mb-12">
                <h3 className="bg-blue-500 text-white p-2 w-100px top-[-1rem] relative left-0 inline-block pl-6 pr-6 text-2xl font-semibold">Don't</h3>
                <ul className="p-4" role="list">
                    {props.donts.map(item => dontItem(item))}
                </ul>
            </div>
        </>
    )
}