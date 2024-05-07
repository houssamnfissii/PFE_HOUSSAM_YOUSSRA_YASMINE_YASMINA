
export default function Hero(){

    return (
        
        <div className="bg-no-repeat bg-cover bg-center relative z-10 pb-32 overflow-x-hidden mx-20">
            <div className="max-w-[1400px] mx-auto lg:flex justify-between items-center px-3 pt-12">
                <div className="lg:w-2/5">
                    <div className="xl:text-[4rem] lg:text-5xl text-4xl lg:text-left text-center font-bold lg:leading-snug mb-5">
                        <h2 className="xl:text-[4rem] lg:text-5xl text:4xl lg:text-left text-center font-bold lg:leading-snug mb-5">It's A Big World Out There, Go Explore</h2>
                        <p className="text-gray text-lg leading-normal mb-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium dolorum quis sapiente facilis quae facere laborum esse assumenda praesentium iure, sunt consequuntur similique unde quasi minima sit, molestias enim et.
                            Numquam, ab hic. Quos fugit labore, nobis quibusdam quia laudantium, explicabo similique laborum accusamus rerum omnis beatae temporibus harum odit officiis corrupti placeat autem sit repellat ipsa. Doloremque, quam vel!
                        </p>
                        <div className="flex flex-1 gap-5">
                            <button className="bg-primary rounded transition-bg shadow h-16 lg:px-10 lg:w-auto w-full outline-none text-white hover:bg-white hover:text-primary cursor-pointer text-base hover:border hover:border-primary">Get Exploration</button>
                            <button className="bg-white rounded transition-bg shadow h-16 lg:px-10 lg:w-auto w-full outline-none text-primary hover:bg-primary hover:text-white cursor-pointer text-base hover:border hover:border-white">Read More</button>
                        </div>
                    </div>
                </div>
                <div className="lg:w-3/5">
                    <img src="/assets/traveler.png" alt="" />
                </div>
            </div>
        </div>
    )
}