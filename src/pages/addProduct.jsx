import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import "./addProduct.css";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../Indicators/LoadingIndicator";
import ErrorIndicator from "../Indicators/ErrorIndicator";
import { userToken } from "../Auth/Token";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const productInfo = {
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value,
      quantity: e.target.quantity.value,
    };
    try {
      setLoading(true);
      const res = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL}/product/add-product`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: productInfo,
      });
      if (res.status == 200) {
        setLoading(false);
        alert("product added successfully");
        navigate("/products");
      } else {
        setErr(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErr(error.message);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }
  if (err) {
    return <ErrorIndicator error={err} />;
  }

  return (
    <>
      <Box className="add-product">
        <h1>Add Product</h1>
        <br />
        <Formik>
          <Form onSubmit={handleAdd}>
            <TextField
              variant="outlined"
              label="Title"
              placeholder="enter title..."
              id="title"
              type="text"
              fullWidth
              required
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="Description"
              placeholder="enter description..."
              id="description"
              fullWidth
              required
              type="text"
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="Price"
              placeholder="enter price..."
              id="price"
              fullWidth
              type="number"
              required
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="Quantity"
              placeholder="enter quantity..."
              id="quantity"
              fullWidth
              type="number"
              required
            />
            <br />
            <h4>{err}</h4>
            <br />
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "orange" }}
              type="submit"
            >
              Add Product
            </Button>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default AddProduct;
