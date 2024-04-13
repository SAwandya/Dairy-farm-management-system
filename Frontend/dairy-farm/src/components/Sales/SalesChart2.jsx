import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { BarChart } from "@mui/x-charts/BarChart";
import usePurcahse from "../../hooks/usePurcahses";
import { color } from "@mui/system";

const SalesChart2 = () => {
  const [seriesNb, setSeriesNb] = React.useState(2);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setItemNb(newValue);
  };
  const handleSeriesNbChange = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setSeriesNb(newValue);
  };

  const { data, error, isLoading } = usePurcahse();

  const orders = data?.map((order) => ({
    _id: order._id,
    quantity: parseInt(order.quantity),
    product: {
      name: order.product.name,
      price: order.product.price,
    },
    orderDate: new Date(order.orderDate),
  }));

  const groupedData = {};
  orders?.forEach((order) => {
    const month = order.orderDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const year = order.orderDate.getFullYear();
    const productType = order.product.name;

    if (!groupedData[productType]) {
      groupedData[productType] = {};
    }
    if (!groupedData[productType][year]) {
      groupedData[productType][year] = {};
    }
    if (!groupedData[productType][year][month]) {
      groupedData[productType][year][month] = 0;
    }

    groupedData[productType][year][month] +=
      order.quantity * order.product.price * 20;
  });

  // Step 3: Create the series array
  const series = [];
  for (const productType in groupedData) {
    const data = [];
    for (const year in groupedData[productType]) {
      for (const month in groupedData[productType][year]) {
        console.log(month);
        const value = groupedData[productType][year][month];
        data[month-1] = value;
      }
    }

    const maxLength = 12;
    for (let i = 0; i < maxLength; i++) {
      if (typeof data[i] === "undefined") {
        data[i] = 0;
      }
    }

    series.push({ label: productType, data });
  }

  console.log(series);

  // groupedData can be set to generate report

  // const newseries = series
  //   .slice(0, seriesNb)
  //   .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }));

  // console.log(series);

  const [seriesData, setSeriesData] = React.useState([]);

  return (
    <>
      <BarChart
        height={370}
        series={series
          .slice(0, seriesNb)
          .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
        skipAnimation={skipAnimation}
        width={1100}
      />

      <Typography color="white" id="input-item-number" gutterBottom>
        Number of months
      </Typography>
      <Slider
        value={itemNb}
        onChange={handleItemNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={15}
        aria-labelledby="input-item-number"
      />
      <Typography color="white" id="input-series-number" gutterBottom>
        Number of Products
      </Typography>
      <Slider
        value={seriesNb}
        onChange={handleSeriesNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={10}
        aria-labelledby="input-series-number"
      />
    </>
  );
};

const highlightScope = {
  highlighted: "series",
  faded: "global",
};

export default SalesChart2;
