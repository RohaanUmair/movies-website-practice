import React from 'react'
import FooterText from './FooterText'
import { IoLanguage } from 'react-icons/io5'

function Footer() {
    return (
        <footer className='h-72 w-full text-[#aaa] flex justify-between pr-36 items-center'>

            <div className='flex w-full justify-between'>
                <div className='flex flex-col gap-4'>
                    <h5 className=''>Questions? Contact us.</h5>
                    <FooterText>FAQ</FooterText>
                    <FooterText>Cookie Preferences</FooterText>
                    <button className='text-white flex items-center gap-2 bg-zinc-900 border border-[#777] rounded w-[135px] py-1 pl-3'><IoLanguage />English</button>
                </div>

                <div className='flex flex-col gap-4 mt-10'>
                    <FooterText>Help Center</FooterText>
                    <FooterText>Corporate Information</FooterText>
                </div>

                <div className='flex flex-col gap-4 mt-10'>
                    <FooterText>Terms of Use</FooterText>
                </div>

                <div className='flex flex-col gap-4 mt-10'>
                    <FooterText>Privacy</FooterText>
                </div>
            </div>

        </footer>
    )
}

export default Footer
