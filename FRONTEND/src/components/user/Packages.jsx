import { HiStar } from "react-icons/hi"

export default function Packages(){
    const Card = ({image, text}) => {
        return (
            <div>
                <div className="overflow-hidden my-0 mx-auto rounded-2xl">
                    <img src={image} alt="" className="rounded-2xl w-[300px] h-[300px] hoverImg"/>
                </div>
                <h5 className="text-2xl py-4 font-semibold">{text}</h5>
                <span className="flex items-center justify-between">
                    <div className="bg-white text-gray shadow rounded-sm w-16 p-2 flex items-center gap-1">
                        <HiStar className="text-orange"/>
                    </div>
                    <p>(2.5k Reviews)</p>
                    <div className="bg-primary text-white text-lg text-center w-20 p-1 rounded-md transition-bg hover:bg-white hover:text-primary">$1200</div>
                </span>
            </div>
        )
    }
    return (
        <div>
            <div>
                <span>
                    <p>Popular Packages</p>
                    <h2>Checkout Our Packages</h2>
                </span>
                <div>
                    <Card image="/assets/tanger.jpg" text="Enjoy the beauty in Tangier city"/>
                    <Card image="/assets/tanger.jpg" text="Enjoy the beauty in Tangier city"/>
                    <Card image="/assets/tanger.jpg" text="Enjoy the beauty in Tangier city"/>
                    <Card image="/assets/tanger.jpg" text="Enjoy the beauty in Tangier city"/>
                </div>
            </div>
            <img src="" alt="" />
        </div>
    )
}