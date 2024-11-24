import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface PopupModuleProps {
    children: React.ReactNode;
    form: React.ReactNode;
}

const PopupModule = ({ children, form }: PopupModuleProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className='rounded-tr-3xl flex pr-1 pt-16'>
                <DialogTitle></DialogTitle>
                {form}
            </DialogContent>
        </Dialog>
    )
}

export default PopupModule