'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {exportDate, exportTime} from "@/components/specific client components/dateTimePicker"

const handleClick = () => {
    console.log("Selected Date:", exportDate)
    console.log("Selected Time:", exportTime)
}

interface RevealBtnProps extends React.ComponentProps<'button'> {
    onclick?: ()=>void;
    classname?: any;



};

const RevealBtn = ({ onclick=handleClick, classname}: RevealBtnProps) => {

    return (
            <Button onClick={onclick} className={`hover:bg-ring hover:text-foreground ${classname}`} variant={"outline"} >
                Explore Events
            </Button>
        
    );
}

export default RevealBtn;