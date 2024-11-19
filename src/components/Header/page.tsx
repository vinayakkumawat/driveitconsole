import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
    return (
        <div className="absolute w-screen bg-white p-4 pr-80">
            <div className="flex gap-4 mx-20">
                <Button className="px-12 bg-secondary text-black">נסיעה חדשה</Button>
                <Button className="px-12 bg-secondary text-black">שליחות חדשה</Button>
                <Button className="px-12 bg-secondary text-black">הודעה לנהגים</Button>
                <Button className="px-12 bg-secondary text-black">נהג חדש</Button>
            </div>
        </div>
    )
}

export default Header