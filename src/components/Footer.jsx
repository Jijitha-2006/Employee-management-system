import React from 'react'
import { Button } from './tailwreck/tailwreck.es'
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaWhatsapp,
    FaLinkedin,
    FaXTwitter,
    FaGithub,
    FaPinterest,
} from "react-icons/fa6";

const Footer = () => {
    const isDark = document.documentElement.classList.contains("dark");

    return (
        <footer className='w-full h-auto bg-slate-800 text-slate-100 font-serif p-10'>


            <div className=' grid grid-cols-2 sm:grid:cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3  '>
                <div>
                    <p className='font-semibold text-xl mb-4 text-slate-100 '>RESOURCES</p>
                    <p>Application</p>
                    <p>Documentation</p>
                    <p>Systems</p>
                    <p>FAQ</p>
                </div>

                <div>
                    <h1 className='font-semibold text-xl mb-4 text-slate-100'>PRICING</h1>
                    <p>Overview</p>
                    <p>Premium Plane</p>
                    <p>Affiliate Program</p>
                    <p>Promotions</p>
                </div>

                <div>
                    <h1 className='font-semibold text-xl mb-4 text-slate-100'>COMPANY</h1>
                    <p>Overview</p> 
                    <p>Premium Plane</p>
                    <p>Affiliate Program</p>
                    <p>Promotions</p>
                </div>
                <div>
                    <h1 className='font-semibold text-xl mb-4 text-slate-100 '>SOCIAL</h1>
                    <p>Overview</p>
                    <p>Premium Plane</p>
                    <p>Affiliate Program</p>
                    <p>Promotions</p>
                </div>
            </div>

            <div className='mt-8 border-b border-gray-600'></div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
                <h1 className=' text-slate-100 text-xl '> All rights Reserved</h1>
                <div className="flex gap-4  flex-wrap md:justify-end ">
                    <Button icon={FaFacebook} iconProps={{
                        size: 16,

                    }} className="bg-blue-600 rounded-full font-medium text-white hover:bg-blue-700">

                    </Button>
                    <Button icon={FaXTwitter} iconProps={{
                        size: 16,
                    }} className="bg-sky-400 rounded-full font-medium text-white hover:bg-sky-500">

                    </Button>

                    <Button icon={FaLinkedin} iconProps={{
                        size: 16,
                    }} className="bg-blue-700 rounded-full font-medium text-white hover:bg-blue-800">

                    </Button>
                    <Button icon={FaInstagram} iconProps={{
                        size: 16,
                    }} className="bg-pink-500 rounded-full font-medium text-white hover:bg-pink-600">

                    </Button>
                </div>
            </div>
        </footer>
    )
}

export default Footer