import AdminProductList from "../features/admin/components/AdminProductList";
import Navbar from "../features/nav-bar/Navbar";
const AdminHome=()=>{
    return(
        <Navbar>
           <AdminProductList></AdminProductList>
        </Navbar>
    );
}

export default AdminHome;