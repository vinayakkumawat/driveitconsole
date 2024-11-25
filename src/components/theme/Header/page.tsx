import React from 'react'
import { Button } from '../../ui/button'
import PopupModule from '../PopupModule'
import NewDriver from '@/components/Forms/NewDriver'

const Header = () => {
    return (
        <div className="absolute w-screen bg-white p-4 pr-80">
            <div className="flex gap-4 mx-20">
                <PopupModule form={<></>}>
                    <Button className="px-12 bg-secondary text-[#3E404C]">נסיעה חדשה</Button>
                </PopupModule>

                <PopupModule form={<></>}>
                    <Button className="px-1</DialogTrigger>2 bg-secondary text-[#3E404C]">שליחות חדשה</Button>
                </PopupModule>

                <PopupModule form={<></>}>
                    <Button className="px-12 bg-secondary text-[#3E404C]">הודעה לנהגים</Button>
                </PopupModule>

                <PopupModule form={<NewDriver />}>
                    <Button className="px-12 bg-secondary text-[#3E404C]">נהג חדש</Button>
                </PopupModule>
            </div>
        </div>
    )
}

export default Header