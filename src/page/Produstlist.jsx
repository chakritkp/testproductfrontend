import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductList,
  selectProductData,
} from "../store/slices/productSlice";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../component/ProductCard";
import FontComponent from "../stylecomponent/FontComponent ";
import LayoutComponent from "../stylecomponent/LayoutComponent";
import InputComponent from "../stylecomponent/InputComponent";

const Produstlist = () => {
  const product = useSelector(selectProductData);
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  useEffect(() => {
    const productItem = product.data
    
    if (searchTerm === '') {
      setProductList(productItem)
    } else {
      const filteredProduct = productItem.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      setProductList(filteredProduct)
    }
    
  }, [searchTerm, product]);

  return (
    <LayoutComponent>
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="w-full">
          <FontComponent fontType={'pagetitle'}>Product List</FontComponent>
        </div>
        <div className="relative w-full">
          <InputComponent
            style={{paddingLeft: `48px`}}
            className="pl-12"
            type="text"
            placeholder="Name, Catalogue, Code"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-2 flex items-center pl-3">
            <FaSearch className="text-[#D9D9D9]" />
          </div>
        </div>
        <div className="flex flex-wrap gap-6 w-[1100px]">
          {productList.length > 0 ? (
            productList.map((product) => 
            <ProductCard 
            key={product._id}
            id={product._id}
            img={product.img}
            name={product.name}
            code={product.code}
            price={product.price}
            />)
          ) : (
            <div className="w-full flex justify-center items-center">
              <FontComponent fontType={'default'}>No products found.</FontComponent>
            </div>
          )}
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Produstlist;
