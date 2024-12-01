import { Box, Button } from "@mui/material";
import "./productDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { userToken, userid } from "../Auth/Token";

const ProductDetail = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const FetchProduct = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}/product/get-products/${id}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.status == 200) {
        setData(res.data.products);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios({
        method: "delete",
        url: `${import.meta.env.VITE_BASE_URL}/product/delete-product/${id}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.status == 200) {
        alert("product deleted successfully");
        navigate("/products");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    FetchProduct();
  }, []);

  const { userID, title, description, price, quantity } = data;

  return (
    <>
      <Box className="single">
        <Box className="single-product">
          <h3>Title : {title}</h3>
          <h4>Description : {description}</h4>
          <h4>Price : {price}</h4>
          <h4>Quantity : {quantity}</h4>
          <Box className="buttons">
            <Button
              disabled={userID != userid}
              variant="contained"
              sx={{ backgroundColor: "red" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              onClick={() => navigate(`/products/edit-product/${id}`)}
              disabled={userID != userid}
              variant="contained"
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetail;
