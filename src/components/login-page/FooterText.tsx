import React from 'react'

function FooterText({children}: {children: React.ReactNode}) {
    return (
        <p className='underline cursor-pointer'>{children}</p>
    )
}

export default FooterText;