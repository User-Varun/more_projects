import {Outlet} from 'react-router-dom'

function MainSection(){
    return(
        <div className="bg-[#525355] min-h-full">

         <Outlet   />
        </div>
        
    )
}

export default MainSection;