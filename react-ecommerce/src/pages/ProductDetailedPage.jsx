import Navbar from "../features/nav-bar/Navbar";
import ProductDetailed from "../features/product/Components/ProductDetailed";
import Footer from "../features/common/Footer";
const ProductDetailedPage=()=>{
    return(
        <>
        <Navbar>
            <ProductDetailed></ProductDetailed>
        </Navbar>
        <Footer></Footer>
        </>
    );
}

export default ProductDetailedPage;