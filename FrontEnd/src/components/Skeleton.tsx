import React from 'react'

const Skeleton = () => {
    return (
        <div
            className='w-full bg-slate-200 flex items-center py-3 px-2 rounded-lg gap-2'
        >
            <div className='w-10 h-10 rounded-full overflow-hidden'>
                <div className='w-full h-full bg-slate-500 animate-pulse'></div>
            </div>
            <div className='h-full flex-1 flex flex-col gap-2 overflow-hidden'>
                <div className='w-full h-3 bg-slate-500 rounded-full animate-pulse'></div>
                <div className='w-1/3 h-3 bg-slate-500 rounded-full animate-pulse'></div>
            </div>
        </div>
    )
}

export default Skeleton