import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductList,
  selectProductData,
} from "../store/slices/productSlice";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../component/ProductCard";

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
    <main className="flex flex-col items-center top-24 p-16 gap-10 h-screen">
      <div className="flex flex-col justify-center items-center gap-8 min-w-[1240px]">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-[#252525]">Product List</h1>
        </div>
        <div className="relative w-full">
          <input
            className="w-full h-[56px] p-6 pl-12 text-[#252525] placeholder:text-[#BCBCC0] text-base font-normal placeholder-gray-200 rounded-3xl border-solid border-2 border-gray-200"
            type="text"
            placeholder="Name, Catalogue, Code"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-2 flex items-center pl-3">
            <FaSearch className="text-[#BCBCC0]" />
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
              <p className="font-medium text-xl text-[#252525]">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Produstlist;
