import Footer from "../features/common/Footer";
import Navbar from "../features/nav-bar/Navbar";
import ProductList from "../features/product/Components/ProductList";
const Home=()=>{
    return(
        <>
        <Navbar>
           <ProductList/>
        </Navbar>
        <Footer></Footer>
        </>

    );
}

export default Home;