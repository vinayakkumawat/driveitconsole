import React from 'react'
import { Button } from '../../ui/button'
import PopupModule from '../PopupModule'
import NewDriver from '@/components/Forms/NewDriver'
import TripForm from '@/components/Forms/TripForm';
import SendMessage from '@/components/Forms/SendMessage';
import MessageToDriver from '@/components/Forms/MessageToDriver';

interface HeaderProps {
    onCancel: () => void;
}

const Header = ({onCancel}: HeaderProps) => {
    return (
        <div className="absolute w-screen bg-white p-4 pr-80">
            <div className="flex gap-4 mx-20">
                <PopupModule form={<TripForm onCancel={onCancel} />}>
                    <Button className="px-12 bg-secondary text-[#3E404C] xl:text-lg">נסיעה חדשה</Button>
                </PopupModule>

                <PopupModule form={<SendMessage onCancel={onCancel} />}>
                    <Button className="px-1</DialogTrigger>2 bg-secondary text-[#3E404C] xl:text-lg">שליחות חדשה</Button>
                </PopupModule>

                <PopupModule form={<MessageToDriver onCancel={onCancel} />}>
                    <Button className="px-12 bg-secondary text-[#3E404C] xl:text-lg">הודעה לנהגים</Button>
                </PopupModule>

                <PopupModule form={<NewDriver onCancel={onCancel} />}>
                    <Button className="px-12 bg-secondary text-[#3E404C] xl:text-lg">נהג חדש</Button>
                </PopupModule>
            </div>
        </div>
    )
}

export default Header