import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Footer from "../../Footer/Footer";
import Featurelist from "../Feature/FeatureProductlist/Featurelist";

const Product_item = ({ products, productsPerPage }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const initialPage = parseInt(queryParams.get("page")) || 1;
	const [currentPage, setCurrentPage] = useState(initialPage);
	const totalPages = Math.ceil(products.length / productsPerPage);

	useEffect(() => {
		setCurrentPage(initialPage);
	}, [initialPage]);

	useEffect(() => {
		navigate(`/product?page=${currentPage}`, { replace: true });
	}, [currentPage, navigate]);

	const handlePageChange = (pageNumber) => {
		if (pageNumber !== currentPage) {
			setCurrentPage(pageNumber);
		}
	};

	const renderProducts = () => {
		const startIndex = (currentPage - 1) * productsPerPage;
		const selectedProducts = products.slice(
			startIndex,
			startIndex + productsPerPage
		);

		return selectedProducts.map((data) => (
			<>
				<Navbar />
				<Featurelist data={data } />
			</>
		));
	};

	const renderPagination = () => {
		const pageNumbers = [];
		const maxButtons = 3; // Number of buttons to show
		let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
		let endPage = Math.min(totalPages, startPage + maxButtons - 1);

		if (endPage - startPage + 1 < maxButtons) {
			startPage = Math.max(1, endPage - maxButtons + 1);
		}

		if (currentPage > 1) {
			pageNumbers.push(
				<div className="w-12 bg-black flex justify-center items-center rounded-full h-12">
					<button
						key="prev"
						onClick={() => handlePageChange(currentPage - 1)}
						className=" text-white">
						˂˂
					</button>
				</div>
			);
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<div className="w-12 bg-black flex justify-center items-center rounded-full h-12">
					<button
						key={i}
						onClick={() => handlePageChange(i)}
						className={`px-4 py-3 rounded-[50%]  text-white ${
							i === currentPage
								? "  text-white border border-black"
								: "bg-black"
						}`}>
						{i}
					</button>
				</div>
			);
		}

		if (currentPage < totalPages) {
			pageNumbers.push(
				<div className="w-12 bg-black flex justify-center items-center rounded-full h-12">
					<button
						key="next"
						onClick={() => handlePageChange(currentPage + 1)}
						className=" text-white rounded-full">
						˃˃
					</button>
				</div>
			);
		}

		return (
			<div className="pagination flex justify-center items-center gap-4 p-4">
				{pageNumbers}
			</div>
		);
	};

	return (
		<div className="product-items">
			<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-20 mb-16 px-16 overflow-x-hidden">
				{renderProducts()}
			</div>

			{renderPagination()}
			<Footer />
		</div>
	);
};

export default Product_item;
