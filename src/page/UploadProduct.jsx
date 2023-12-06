import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const cloudinaryName = import.meta.env.VITE_CLOUDINARY_NAME;
const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

import { resetProductData, addProduct } from "../store/slices/productSlice";

import { PiUploadSimpleThin } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { MdNavigateBefore } from "react-icons/md";
import LayoutComponent from "../stylecomponent/LayoutComponent";
import FontComponent from "../stylecomponent/FontComponent ";
import InputComponent from "../stylecomponent/InputComponent";
import ButtonComponent from "../stylecomponent/ButtonComponent";

const UploadProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disabledButton, setDisabledButton] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [formData, setFormData] = useState({
    img: [],
    name: "",
    code: "",
    price: 0,
  });

  const handleRemoveImg = (index) => {
    const updatedFile = [
      ...formData.img.slice(0, index),
      ...formData.img.slice(index + 1),
    ];

    setFormData((prevData) => ({
      ...prevData,
      img: updatedFile,
    }));

    setFormData((prevData) => ({
      ...prevData,
      img: updatedFile,
    }));

    const updatedFileName = [
      ...fileName.slice(0, index),
      ...fileName.slice(index + 1),
    ];
    setFileName(updatedFileName);

    const updetedImagePreview = [
      ...imagePreview.slice(0, index),
      ...imagePreview.slice(index + 1),
    ];
    setImagePreview(updetedImagePreview);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "img") {
      const files = e.target.files;

      if (files) {
        const validFileTypes = ["image/jpeg", "image/png"];

        const validFiles = Array.from(files).filter((file) =>
          validFileTypes.includes(file.type)
        );

        if (validFiles.length !== files.length) {
          toast.error("Invalid file type. Please choose JPG or PNG file", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }

        const maxSize = 50 * 1024 * 1024;
        const newFiles = validFiles.filter((file) => file.size <= maxSize);

        if (newFiles.length === 0) {
          toast.error("File size exceeds 50MB", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }

        if (formData.img.length === 6) {
          toast.error("You can upload a maximum of 6 files", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }

        setFormData((prevData) => ({
          ...prevData,
          img: [newFiles[0], ...prevData.img],
        }));

        setFileName((prevFile) => [
          ...prevFile,
          ...newFiles.map((file) => file.name),
        ]);

        setImagePreview((prevImage) => [
          ...prevImage,
          ...newFiles.map((file) => URL.createObjectURL(file)),
        ]);
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "price" ? Number(value) : value,
      }));
    }
  };

  const handleInputSumit = async (e) => {
    e.preventDefault();
    if (
      formData.img.length === 0 ||
      formData.name === "" ||
      formData.code === "" ||
      formData.price === 0
    ) {
      toast.error("All fields are required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const uploadPromises = formData.img.map(async (file) => {
        const newFormData = new FormData();
        newFormData.append("file", file);
        newFormData.append("upload_preset", cloudinaryPreset);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
          newFormData
        );

        return response.data.url;
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      const newProdute = {
        img: uploadedFiles.reverse(),
        name: formData.name,
        code: formData.code,
        price: formData.price,
      };
      setDisabledButton(true);
      dispatch(addProduct(newProdute));
      dispatch(resetProductData());
      toast.success("Add Product Success!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setInterval(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleResetInput = () => {
    setFormData({
      img: [],
      name: "",
      code: "",
      price: 0,
    });
  
    setFileName([]);
    setImagePreview([]);
  }

  return (
    <LayoutComponent>
      <Link to="/">
        <div className="w-full fixed top-0 left-0 h-[80px] flex justify-start items-center pb-3 bg-white">
          <MdNavigateBefore size={"48px"} />
          <FontComponent fontType={"title"} fontSize={"24px"}>
            Productlist
          </FontComponent>
        </div>
      </Link>
      <form
        className="flex flex-col gap-10 justify-center items-center"
        onSubmit={handleInputSumit}
        method="post"
      >
        <div className="w-full">
          <FontComponent fontType={"pagetitle"}>Upload Product</FontComponent>
        </div>

        <div className="flex flex-col gap-2 w-[924px] ">
          <div className="flex flex-col gap-2 w-full">
            <FontComponent fontType={"title"}>Upload Image</FontComponent>
            <div
              className="flex flex-col gap-3 justify-center items-center w-full h-[350px] rounded-xl cursor-pointer border-dashed border-[1px] border-[#D9D9D9]"
              onClick={() => document.querySelector("#inputImg-field").click()}
            >
              <input
                type="file"
                name="img"
                accept="image/*"
                id="inputImg-field"
                hidden
                onChange={handleInputChange}
              />

              {imagePreview.length > 0 ? (
                <div className="flex flex-col justify-center items-center gap-3">
                  <div className="flex">
                    {imagePreview.map((img, index) => (
                      <div
                        className="w-[150px] h-[150px] overflow-hidden"
                        key={index}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <CiSquarePlus size={"80px"} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <PiUploadSimpleThin size={"26px"} />
                  <FontComponent color={"#6C6C70"}>
                    Drag & Drop of{" "}
                    <a className="underline text-blue-600">Choose file</a> to
                    upload
                  </FontComponent>
                  <FontComponent fontSize={"12px"} color={"#6C6C70"}>
                    JPG or PNG Maximum file size 50MB.
                  </FontComponent>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <FontComponent
                fontSize={"12px"}
                color={"#6C6C70"}
                textAlign={"end"}
              >
                image upload ({fileName.length}/6)
              </FontComponent>
              {fileName.map((fileImg, index) => (
                <div
                  key={index}
                  className="flex p-5 overflow-hidden justify-between items-center w-full h-[40px] rounded-3xl bg-slate-200"
                >
                  <p>{fileImg}</p>
                  <button onClick={(e) => handleRemoveImg(index)}>
                    <MdDeleteForever size={"32px"} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <FontComponent fontType={"title"}>Product name</FontComponent>
              <InputComponent
                className="w-full text-base font-light h-[56px] placeholder-gray-200 rounded-3xl px-6 border-solid border-[1px] border-[#D9D9D9]"
                type="text"
                name="name"
                placeholder="Product name"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FontComponent fontType={"title"}>Code</FontComponent>
              <InputComponent
                className="w-full text-base font-light h-[56px] placeholder-gray-200 rounded-3xl px-6 border-solid border-[1px] border-[#D9D9D9]"
                type="text"
                name="code"
                placeholder="Code"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FontComponent fontType={"title"}>Price</FontComponent>
              <InputComponent
                className="w-full text-base font-light h-[56px] placeholder-gray-200 rounded-3xl px-6 border-solid border-[1px] border-[#D9D9D9]"
                type="number"
                name="price"
                placeholder="฿1,000"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <ButtonComponent
            color={"#E13B30"}
            bg={"#FFFFFF"}
            border={"1px solid #D9D9D9"}
            type="reset"
            onClick={handleResetInput}
            disabled={disabledButton}
          >
            ยกเลิก
          </ButtonComponent>
          <ButtonComponent
            color={"#FFFFFF"}
            bg={"#E13B30"}
            type="submit"
            disabled={disabledButton}
          >
            ยืนยัน
          </ButtonComponent>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </form>
    </LayoutComponent>
  );
};

export default UploadProduct;
