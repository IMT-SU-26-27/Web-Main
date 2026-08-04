import React from 'react'

type TLInfoPanelDecorativeProps = {
    children: React.ReactNode;
};

export default function TLInfoPanelDecorative({ children }: TLInfoPanelDecorativeProps) {
    return (
        <div
            className='font-cinzel py-2 px-8 rounded-lg font-bold text-white border-black text-3xl absolute z-5 -top-4 md:top-2 -left-4 md:-left-8 -rotate-z-[5deg] md:-rotate-z-[15deg] bg-[#BF6432] border-2'
        >
            <span className='font-outline-4 z-1 absolute text-[#7E3E11]'>{children}</span>
            <p className='relative z-2'>{children}</p>
        </div>
    )
}
