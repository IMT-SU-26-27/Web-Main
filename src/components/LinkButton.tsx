import React from 'react'
import Link from 'next/link';
type ButtonProps = {
    size: 'xl' | 'md' | 'sm';
    children: React.ReactNode;
    href: string;
    extraClass?: string;
};

export default function LinkButton({ href, children, size, extraClass }: ButtonProps) {
    const sizeClasses = {
        xl: 'sm:text-xl lg:text-4xl px-14 py-2',
        md: 'sm:text-lg lg:text-2xl px-10 py-2',
        sm: 'sm:text-base lg:text-xl px-6 py-2',
    }[size];

    return (
        <>
            <Link className={`bg-secondary hover:bg-amber-200 font-semibold rounded-lg border-2 border-black text-center ${extraClass} ${sizeClasses}`} href={href}>{children}</Link>
        </>
    )
}
