import '../index.css';
import { Link , NavLink} from "react-router-dom"
// import {ErrorBoundary} from 'react-error-boundary'

function Navbar(){
    return(
    <div className='flex justify-center p-[1rem] bg-[#262626]'>

       <Link to="/add-task" className="bg-[#4CA3ED] pt-[0.4rem] pb-[0.4rem] pl-[0.9rem] 
     pr-[0.9rem] rounded-full text-[#FFFFFF]">Create new Task </Link>

    </div>
)
}

export default Navbar;