import React, { useEffect, useState } from 'react'
import axios from "axios";
import Product from '../components/Product';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Filter from '../components/Filter';
import { useProductContext } from '../context/ProductContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const { roll, isLoggedFun } = useProductContext();
  const [product, setProduct] = useState();
  const [filterProduct, setFilterProduct] = useState();
  const [color, setColor] = useState("All");
  const [mileage, setMileage] = useState("All");
  const [price, setPrice] = useState("All");


  useEffect(() => {
    fetchProduct()
  }, [])

  async function fetchProduct() {
    const { data } = await axios.get("http://localhost:4500/dealer");
    setProduct(data);
    setFilterProduct(data);
  }

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("attryb"));
    isLoggedFun(localData);
  }, [])




  function colorFilter() {

    const filtered = product && filterProduct.filter((item) => {
      if (color == 'All') {
        return item;
      }
      return (
        item.color == color
      )
    })
    setFilterProduct(filtered);
  }

  function mileageFilter() {
    const values = mileage.split('-');
    const firstParam = Number(values[0]);
    const secondParam = Number(values[1]);


    const filtered = product && filterProduct.filter((item) => {
      if (mileage == 'All') {
        return item;
      }
      return (
        item.mileage >= firstParam && item.mileage <= secondParam
      )
    })
    setFilterProduct(filtered);
  }
  function priceFilter() {
    const values = mileage.split('-');
    const firstParam = Number(values[0]);
    const secondParam = Number(values[1]);

    const filtered = product && filterProduct.filter((item) => {
      if (price == 'All') {
        return item;
      }
      return (
        item.price >= firstParam && item.price <= secondParam
      )
    })
    setFilterProduct(filtered);
  }

  useEffect(() => {
    colorFilter();
  }, [color])

  useEffect(() => {
    mileageFilter();
  }, [mileage])

  useEffect(() => {
    priceFilter();
  }, [price])


  async function deleteItem(ids) {
    const { data } = await axios.delete(`http://localhost:4500/dealer/${ids}`);
    if (data.status) {
      fetchProduct();
    }
  }
  return (
    <React.Fragment>

      <Box sx={{ width: 'auto' }}>
        <Grid container spacing={2}>
          <Grid xs={2}>
            {product && <Filter setColor={setColor} setMileage={setMileage} setPrice={setPrice} />}
          </Grid>
          <Grid xs={10} >
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {
                  filterProduct && filterProduct.map((item) => {
                    return (
                      <Grid xs={3} key={item._id}>
                        <Card sx={{ maxWidth: 340 }}>
                          <Box
                            component="img"
                            sx={{
                              height: 233,
                              width: 340,
                              padding: "8px",
                              maxHeight: { xs: 233, md: 167 },
                              maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="The house from the offer."
                            src={`http://localhost:4500/${item.image}`}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.point}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <h4>Colour : {item.color}</h4>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <h4>Mileage : {item.mileage} KM/L</h4>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <h4>Price : {item.price} L</h4>
                            </Typography>
                          </CardContent>
                          {
                            roll != 'buyer' ?
                              (
                                <CardActions>
                                  <Button size="small" onClick={() => deleteItem(item._id)}>Delete</Button>
                                  <RouterLink to={`/edititem/${item._id}`}>
                                    <Button size="small">Edit</Button>
                                  </RouterLink>
                                </CardActions>
                              )
                              : ""
                          }

                        </Card>
                      </Grid>
                    )
                  })
                }
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default Home