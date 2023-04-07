import { useState } from "react";
import Select from "react-select";


const Filter = ({ setColor, setMileage, setPrice }) => {
  const colorOptions = ['black', 'blue', 'green', 'white', 'red'];
  const mileageOptions = ['0-5', '6-10', '11-15', '16-20', '21-25', '25-30', '30-50']
  const priceOptions = ['0-5', '6-10', '11-15', '16-20', '21-25', '25-30', '30-100']

  const colorOptionChangeHandler = (event) => {
    setColor(event.target.value);
    console.log("User Selected Value - ", event.target.value)
  }
  const mileageOptionChangeHandler = (event) => {
    setMileage(event.target.value);
    console.log("User Selected Value - ", event.target.value)
  }
  const priceOptionChangeHandler = (event) => {
    setPrice(event.target.value);
    console.log("User Selected Value - ", event.target.value)
  }
  return (
    <div className="options">
      <div className="car-options">
        <h3>Filter color</h3>
        <select onChange={colorOptionChangeHandler}>
          <option>Choose color</option>
          {colorOptions.map((option, index) => {
            return <option key={index} >
              {option}
            </option>
          })}
        </select>
      </div>
      <div className="mileage-options">
        <h3>Filter mileage</h3>
        <select onChange={mileageOptionChangeHandler}>
          <option>Choose color</option>
          {mileageOptions.map((option, index) => {
            return <option key={index} >
              {option}
            </option>
          })}
        </select>
      </div>
      <div className="mileage-options">
        <h3>Filter price</h3>
        <select onChange={priceOptionChangeHandler}>
          <option>Choose price</option>
          {priceOptions.map((option, index) => {
            return <option key={index} >
              {option}
            </option>
          })}
        </select>
      </div>
      <div className="price-options"></div>
    </div>
  );
}

export default Filter