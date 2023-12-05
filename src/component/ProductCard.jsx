import React, { useEffect, useState } from "react";

const ProductCard = ({ id, img, name, code, price }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => {
        const newIndex = prevIndex < img.length - 1 ? prevIndex + 1 : 0;
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlideIndex, img.length]);

  return (
    <div key={id} className="w-[200px] h-[335px] rounded-2xl shadow-lg">
      <div className="w-[200px] h-[335px] rounded-2xl shadow-lg">
        <div className="flex overflow-hidden rounded-t-xl relative">
          {img.map((img, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${img})`,
              }}
              className={`min-w-[200px] z-10 min-h-[200px] -translate-x-[${
                currentSlideIndex * 200
              }px] bg-cover duration-500 bg-slate-500 overflow-hidden transform scale-100`}
            />
          ))}

          <div className="flex gap-1 w-[200px] justify-center absolute z-50 bottom-3">
            {img.map((img, index) => (
              <div
                key={index}
                className={`w-4 h-[2px] ${
                  index === currentSlideIndex % img.length
                    ? "bg-[#E13B30]"
                    : "bg-[#D9D9D9]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 p-4">
          <div>
            <h3 className="text-[#252525] text-base font-semibold">{name}</h3>
            <p className="text-[#252525] text-xs font-light">{code}</p>
          </div>
          <div className="flex justify-end">
            <h2 className="text-xl font-semibold text-[#E13B30]">฿{price}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
