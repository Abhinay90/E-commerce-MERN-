import AdminOrders from "../features/admin/components/AdminOrders";
import AdminProductList from "../features/admin/components/AdminProductList";
import Navbar from "../features/nav-bar/Navbar";
const AdminOrdersPage=()=>{
    return(
        <Navbar>
           <AdminOrders></AdminOrders>
        </Navbar>
    );
}

export default AdminOrdersPage;