'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface PopupModuleProps {
    children: React.ReactNode;
    form: React.ReactNode;
}

const PopupModule = ({ children, form }: PopupModuleProps) => {
    const [open, setOpen] = useState(false);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className='rounded-tr-3xl flex pr-1 pt-16'>
                <DialogTitle></DialogTitle>
                {form && React.cloneElement(form as React.ReactElement, { onCancel: () => setOpen(false) })}
            </DialogContent>
        </Dialog>
    )
}

export default PopupModule