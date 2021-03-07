import React from 'react'


const Cards = ({ color, ...props }) => {
    return (
        <svg {...props} id="Capa_1" enable-background="new 0 0 512 512" height="21" viewBox="0 0 512 512" width="21" xmlns="http://www.w3.org/2000/svg">
            <g fill={color || '#000'}>
                <path d="m442 427h-20c-8.284 0-15 6.716-15 15s6.716 15 15 15h20c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/>
                <path d="m321 356h-20c-8.284 0-15 6.716-15 15s6.716 15 15 15h20c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/>
                <path d="m477 142h-86v-36c0-19.299-15.701-35-35-35h-86v-36c0-19.299-15.701-35-35-35h-200c-19.299 0-35 15.701-35 35v300c0 19.299 15.701 35 35 35h86v36c0 19.299 15.701 35 35 35h86v36c0 19.299 15.701 35 35 35h200c19.299 0 35-15.701 35-35v-300c0-19.299-15.701-35-35-35zm-447 193v-300c0-2.757 2.243-5 5-5h200c2.757 0 5 2.243 5 5v300c0 2.757-2.243 5-5 5h-200c-2.757 0-5-2.243-5-5zm121 71v-36h84c19.299 0 35-15.701 35-35v-234h86c2.757 0 5 2.243 5 5v300c0 2.757-2.243 5-5 5h-200c-2.757 0-5-2.243-5-5zm331 71c0 2.757-2.243 5-5 5h-200c-2.757 0-5-2.243-5-5v-36h84c19.299 0 35-15.701 35-35v-234h86c2.757 0 5 2.243 5 5z"/>
                <path d="m197.206 176.281-50-70c-2.816-3.941-7.362-6.281-12.206-6.281s-9.39 2.34-12.206 6.281l-50 70c-3.725 5.216-3.725 12.222 0 17.438l50 70c2.816 3.941 7.362 6.281 12.206 6.281s9.39-2.34 12.206-6.281l50-70c3.725-5.216 3.725-12.222 0-17.438zm-62.206 52.912-31.566-44.193 31.566-44.193 31.566 44.193z"/>
                <path d="m105 70c0-8.284-6.716-15-15-15h-20c-8.284 0-15 6.716-15 15s6.716 15 15 15h20c8.284 0 15-6.716 15-15z"/>
                <path d="m200 285h-20c-8.284 0-15 6.716-15 15s6.716 15 15 15h20c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/>
            </g>
        </svg>    
    )
    
}

export default Cards


