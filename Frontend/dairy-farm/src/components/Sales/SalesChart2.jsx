import * as React from "react";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { BarChart } from "@mui/x-charts/BarChart";
import usePurcahse from "../../hooks/usePurcahses";
import AnalysisRep from "../../pages/Sales/AnalysisRep";
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
    const month = order.orderDate.getMonth();
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

    groupedData[productType][year][month] += order.quantity;
  });

  // Step 3: Create the series array
  const series = [];
  for (const productType in groupedData) {
    const data = [];
    for (const year in groupedData[productType]) {
      for (const month in groupedData[productType][year]) {
        const value = groupedData[productType][year][month];
        data[month] = value;
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

  const newseries = series
    .slice(0, seriesNb)
    .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }));

  
  return (
    <>
      <BarChart
        height={370}
        series={series
          .slice(0, seriesNb)
          .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
        skipAnimation={skipAnimation}
        width={1100}
        sx={{
          backgroundColor: "#252B48",
          borderRadius: "20px",
          paddingLeft: "16px",
          marginTop: "26px",
          "& .MuiChartsLegend-series": {
            stroke: "#fff",
          },
        }}
      ></BarChart>

      <Typography
        sx={{ paddingTop: "20px" }}
        id="input-item-number"
        gutterBottom
        fontSize="20px"
      >
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
      <Typography
        sx={{ paddingTop: "10px" }}
        id="input-series-number"
        gutterBottom
        fontSize="20px"
      >
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
      <AnalysisRep newseries={newseries} />
    </>
  );
};

export default SalesChart2;
