import Navbar from "../features/nav-bar/Navbar"
import UserOrder from "../features/user/components/UserOrder"

const UserOrdersPage=()=>{
    return(
        <Navbar>
            <h1 className="mx-auto text-4xl font-bold">My Orders</h1>
            <UserOrder></UserOrder>
        </Navbar>
    )
}

export default UserOrdersPage;