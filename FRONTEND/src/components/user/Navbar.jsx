import { useState } from "react";
import {HiMenuAlt3} from "react-icons/hi";
import {MdClose} from "react-icons/md";

export default function Navbar(){
    const [dropdown,setDropdown] = useState(false)

    const showDropdown = () => {
        setDropdown(!dropdown)
    }
    return(
        <nav className="w-full h-24 flex justify-center items-center sticky top-0 z-50 bg-white px-20">
            <div className="max-w-[1400px] w-full">
                <div className="lg:w-full w-11/12 mx-auto h-full flex justify-between items-center">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-2">
                            <img height={"100px"} width={"100px"} src="assets/logo1.png" alt="" />
                        </div>
                    </div>
                    <ul className="flex items-center xl:gap-12 gap-x-4 max-lg:hidden ">
                        <a 
                            href="#"
                            className="leading-normal no-undeline text-black font-bold text-lg hover:text-primary"
                        >
                            Tours
                        </a>
                        <a 
                            href="#"
                            className="leading-normal no-undeline text-black font-bold text-lg hover:text-primary"
                        >
                            Hotels
                        </a>
                        <a 
                            href="#"
                            className="leading-normal no-undeline text-black font-bold text-lg hover:text-primary"
                        >
                            Restaurants
                        </a>
                        <a 
                            href="#"
                            className="leading-normal no-undeline text-black font-bold text-lg hover:text-primary"
                        >
                            Cars
                        </a>
                        <a 
                            href="#"
                            className="leading-normal no-undeline text-black font-bold text-lg hover:text-primary"
                        >
                            About
                        </a> 
                        <a 
                            href="#"
                            className="leading-normal no-undeline text-black font-bold text-lg hover:text-primary"
                        >
                            Become a Host
                        </a>
                        <button 
                            className="bg-primary rounded-shadow h-16 px-12 outline-none text-white hover:bg-white hover:text-primary cursor-pointer text-base transition-bg hover:border hober:border-primary"
                        >
                            Sign In
                        </button>
                    </ul>
                    {dropdown ? (
                        <div onClick={showDropdown} 
                        className="lg:hidden text-[22px] cursor-pointer text-black"
                        >
                            <MdClose />
                        </div>
                    ) : (
                        <div onClick={showDropdown} 
                        className="lg:hidden text-[22px] cursor-pointer text-black"
                        >
                            <HiMenuAlt3 />
                        </div>
                    )} 
                </div>
                {dropdown && (
                    <div className="lg:hidden w-full fixed top-24 bg-primary transition-all">

                        <div className="w-full flex flex-col items-baseline gap-4"> 
                            <ul className="flex flex-col justify-center w-full">
                            <a 
                            href="#"
                            className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                            >
                                Tours
                            </a>
                            <a 
                            href="#"
                            className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                            >
                                Hotels
                            </a>
                            <a 
                            href="#"
                            className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                            >
                                Restaurants
                            </a>
                            <a 
                            href="#"
                            className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                            >
                                Cars
                            </a>
                            <a 
                            href="#"
                            className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                            >
                                About
                            </a>
                            <a 
                            href="#"
                            className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                            >
                                Become a host
                            </a>
                            <button
                            className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                            >
                            Sign In
                            </button>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}