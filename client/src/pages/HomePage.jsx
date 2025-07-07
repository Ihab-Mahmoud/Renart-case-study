import React, { useState, useRef } from "react";
import Product from "../components/Product";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useLoaderData } from "react-router";

export const Loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await axios.get("/api/v1/product/get-all-products", {
      params,
    });
    return { params, data };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const HomePage = () => {
  const { data, params } = useLoaderData();

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const [filters, setFilters] = useState({
    minPrice: params?.minPrice || "100",
    maxPrice: params?.maxPrice || "1000",
    minScore: params?.minScore || "0",
    maxScore: params?.maxScore || "1",
  });

  const filterFields = [
    {
      name: "minPrice",
      label: "Min Price",
      type: "range",
      min: 0,
      max: 1000,
      step: 50,
    },
    {
      name: "maxPrice",
      label: "Max Price",
      type: "range",
      min: 0,
      max: 1000,
      step: 50,
    },
    {
      name: "minScore",
      label: "Min Score",
      type: "range",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      name: "maxScore",
      label: "Max Score",
      type: "range",
      min: 0,
      max: 1,
      step: 0.01,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <h2 className="p-3 " style={{ fontWeight: "300", marginTop: "30px" }}>
        Product List
      </h2>
      <form className="bg-white rounded-lg shadow-md w-full max-w-md py-2 ">
        <div className="filter-container flex flex-col gap-5">
          {filterFields.map(({ name, label, type, min, max, step }) => (
            <div key={name} className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor={name}
                  className="text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                <span className="text-xs text-gray-600 px-2">
                  {filters[name]}
                </span>
              </div>
              <input
                id={name}
                name={name}
                type={type}
                min={min}
                max={max}
                step={step}
                value={filters[name]}
                onChange={handleChange}
                className={`w-full accent-pink-600 range-input 
                `}
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-pink-600 text-dark font-medium py-2 px-4 rounded-md hover:bg-pink-700 transition border rounded"
          >
            Apply Filters
          </button>
        </div>
      </form>

      <div className="carousel-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div className="scroll-container" ref={scrollRef}>
          {data?.data.map((product) => (
            <Product key={product.name} data={product} />
          ))}
        </div>

        <button className="scroll-button right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
