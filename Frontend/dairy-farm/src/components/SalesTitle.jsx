import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

const SalesTitle = (props) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

SalesTitle.propTypes = {
  children: PropTypes.node,
};

export default SalesTitle;
