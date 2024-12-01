import { Box, Button } from "@mui/material";
import "./products.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import LoadingIndicator from "../Indicators/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import ErrorIndicator from "../Indicators/ErrorIndicator";
import { userToken } from "../Auth/Token";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [sort, setSort] = useState("");

  const navigate = useNavigate();

  const FetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_BASE_URL
        }/product/get-products?page=${page}&sort=${sort}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.status == 200) {
        setProduct(res.data.products);
        setTotalPage(res.data.totalPages);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.message);
    }
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    FetchProducts();
  }, [page, sort]);

  if (loading) {
    return <LoadingIndicator />;
  }
  if (err) {
    return <ErrorIndicator error={err} />;
  }

  return (
    <>
      {err ? (
        <div className="error">
          <h1>{err}</h1>
        </div>
      ) : (
        <Box>
          <Navbar />
          <Box className="product-container">
            <Box className="sorting">
              <Button
                variant="contained"
                sx={{ backgroundColor: "white", color: "black" }}
                onClick={handlePrev}
                disabled={page == 1}
              >
                {"<<"}
              </Button>
              <select onChange={(e) => setSort(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
              <Button
                variant="contained"
                sx={{ backgroundColor: "tomato", color: "black" }}
                onClick={() => navigate("/add-product")}
              >
                Add Product
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "white", color: "black" }}
                onClick={handleNext}
                disabled={totalPage == page}
              >
                {">>"}
              </Button>
            </Box>
            <Box className="products">
              {product &&
                product.map((item) => (
                  <Box className="product" key={item._id}>
                    <h3>{item.title}</h3>
                    <h4>{item.price}</h4>
                    <h5>Qty:{item.quantity}</h5>
                    <Box>
                      <br />
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: "green" }}
                        onClick={() => navigate(`/products/${item._id}`)}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Products;
