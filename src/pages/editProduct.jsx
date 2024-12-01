import { Box, Button, TextField } from "@mui/material";
import "./editProduct.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userToken } from "../Auth/Token";
import axios from "axios";
import LoadingIndicator from "../Indicators/LoadingIndicator";
import ErrorIndicator from "../Indicators/ErrorIndicator";

const EditProduct = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { id } = useParams();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
  });

  const FetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}/product/get-products/${id}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (res.status == 200) {
        setProductInfo(res.data.products);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios({
        method: "put",
        url: `${import.meta.env.VITE_BASE_URL}/product/update-product/${id}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: productInfo,
      });
      if (res.status == 200) {
        setToggle(!toggle);
        alert("product updated successfully");
        navigate("/products");
        setLoading(false);
      }
    } catch (error) {
      setErr(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchProducts();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }
  if (err) {
    return <ErrorIndicator />;
  }

  return (
    <>
      <Box className="edit-product">
        <Box>
          <TextField
            label="Title"
            fullWidth
            type="text"
            placeholder="enter title..."
            value={productInfo.title}
            name="title"
            InputProps={{ readOnly: !toggle }}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="Description"
            fullWidth
            type="text"
            name="description"
            placeholder="enter description..."
            value={productInfo.description}
            InputProps={{ readOnly: !toggle }}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="Price"
            fullWidth
            type="number"
            name="price"
            placeholder="enter price..."
            value={productInfo.price}
            InputProps={{ readOnly: !toggle }}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="Quantity"
            fullWidth
            type="number"
            name="quantity"
            placeholder="enter quantity..."
            value={productInfo.quantity}
            InputProps={{ readOnly: !toggle }}
            onChange={handleChange}
          />
          <br />
          <br />
          <Box>
            {toggle ? (
              <Box className="edit-buttons">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleUpdate(id)}
                >
                  Update
                </Button>
                <br />
                <br />
                <Button
                  fullWidth
                  onClick={() => setToggle(!toggle)}
                  variant="contained"
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button
                sx={{ backgroundColor: "greenyellow", color: "black" }}
                variant="contained"
                fullWidth
                onClick={() => setToggle(!toggle)}
              >
                Edit
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditProduct;
