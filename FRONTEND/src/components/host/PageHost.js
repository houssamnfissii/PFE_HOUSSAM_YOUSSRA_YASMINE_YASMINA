import { Link } from "react-router-dom"
export default function PageHost(){
    return(
        <div>
            <nav>
                <Link>My profile</Link>
            </nav>

            <div>
                <Link to="/addOffer">Add Offer</Link>
                <select>
                    <option>search eoffer by type</option>
                </select>

            </div>
        </div>
    )
}