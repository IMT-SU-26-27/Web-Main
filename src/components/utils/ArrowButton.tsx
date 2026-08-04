import React from 'react'
import { ArrowButtonProps } from '@/types/action'

export default function ArrowButton(props: ArrowButtonProps) {
    const directionClass = props.direction === 'left' ? ' rotate-z-180' : ''

    return (
        <svg width="63" className={"z-4 hover:fill-amber-300 hover:scale-110 " + props.extraClass + directionClass} height="69" viewBox="0 0 63 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3399_31)">
                <g filter="url(#filter0_i_3399_31)">
                    <path d="M57 25.8404C63.6667 29.6894 63.6667 39.3119 57 43.1609L15.75 66.9766C9.08333 70.8256 0.750004 66.0143 0.750005 58.3163L0.750007 10.6849C0.750007 2.9869 9.08334 -1.82435 15.75 2.02466L57 25.8404Z" fill="#FFB422" />
                </g>
                <path d="M55.75 28.0055C60.75 30.8922 60.75 38.109 55.75 40.9957L14.5 64.8112C9.5 67.6979 3.25 64.0895 3.25 58.316L3.25 10.6852C3.25 4.91168 9.5 1.30331 14.5 4.19006L55.75 28.0055Z" stroke="white" strokeWidth="5" strokeLinejoin="round" />
                <g filter="url(#filter1_i_3399_31)">
                    <path d="M55.5 30.1705C58.8333 32.095 58.8333 36.9062 55.5 38.8307L12.75 63.5125C9.41667 65.437 5.25 63.0313 5.25 59.1823L5.25 9.81889C5.25 5.96989 9.41667 3.56426 12.75 5.48876L55.5 30.1705Z" fill="#FFB422" />
                </g>
                <path d="M54.25 32.3356C55.9167 33.2978 55.9166 35.7034 54.25 36.6656L11.5 61.3473C9.83333 62.3095 7.75 61.1067 7.75 59.1822L7.75 9.81897C7.75 7.89446 9.83334 6.69168 11.5 7.65393L54.25 32.3356Z" stroke="black" strokeWidth="5" strokeLinejoin="round" />
            </g>
            <defs>
                <filter id="filter0_i_3399_31" x="0.75" y="0.670044" width="61.25" height="71.6611" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_3399_31" />
                </filter>
                <filter id="filter1_i_3399_31" x="5.25" y="4.8114" width="52.75" height="63.3784" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_3399_31" />
                </filter>
                <clipPath id="clip0_3399_31">
                    <rect width="63" height="69" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}
