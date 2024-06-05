import { CiSearch } from "react-icons/ci";
import { FaSpotify } from "react-icons/fa";



export default function Header(){
    return(
        <header className="flex flex-row justify-around p-4 items-center">
            <a className="text-green-600 text-5xl"><FaSpotify/></a>
            <a href="#search"><CiSearch size={30}/></a>
        </header>
    )
}