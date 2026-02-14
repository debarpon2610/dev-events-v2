'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface ExploreBtnProps extends React.ComponentProps<'button'> {
    onclick?: ()=>void;
    classname?: any;



};

const handleClick=()=>{
    console.log("Explore button clicked");  
}

const ExploreBtn = ({ onclick=handleClick, classname}: ExploreBtnProps) => {

    return (
        <Link href="#events">
            <Button onClick={onclick} className={`hover:bg-ring hover:text-foreground ${classname}`} variant={"outline"} >
            Explore Events
            <Image src="/icons/arrow-down.svg" alt="arrow down" width={16} height={16} className="ml-2"/>
        </Button>
        </Link>
        
    );
}

export default ExploreBtn;