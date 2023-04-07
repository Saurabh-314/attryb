import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";


const EditItem = () => {
  const [product, setProduct] = useState();
  let { id } = useParams();

  useEffect(async () => {
    axios.get(`http://localhost:4500/dealer/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [])

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      title: data.get('title'),
      image: data.get('image'),
      point: data.get('point'),
      price: data.get('price'),
      color: data.get('color'),
      mileage: data.get('mileage'),
    };
    const res = await fetch(`http://localhost:4500/dealer/${id}`, {
      method: "PATCH",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      }
    })
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Feature
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="title"
                required
                fullwidth="true"
                id="title"
                label="title"
                autoFocus
                value={product ? product.title : ""}
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullwidth="true"
                id="price"
                label="price"
                name="price"
                autoComplete="family-name"
                value={product ? product.price : ""}
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullwidth="true"
                id="color"
                label="color"
                name="color"
                autoComplete="family-name"
                value={product ? product.color : ""}
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullwidth="true"
                id="mileage"
                label="mileage"
                name="mileage"
                autoComplete="family-name"
                value={product ? product.mileage : ""}
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <TextField
                  required
                  fullWidth
                  id="point"
                  label="point"
                  name="point"
                  autoComplete="family-name"
                  multiline
                  maxRows={5}
                  value={product ? product.point : ""}
                  onChange={changeHandler}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  required
                  fullwidth="true"
                  id="image"
                  label="image"
                  name="image"
                />
              </Button>

            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default EditItem