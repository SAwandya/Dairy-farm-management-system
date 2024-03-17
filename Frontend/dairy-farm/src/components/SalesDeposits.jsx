import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import SalesTitle from "./SalesTitle";

function preventDefault(event) {
  event.preventDefault();
}

const SalesDeposits = () => {
  return (
    <React.Fragment>
      <SalesTitle>Recent Deposits</SalesTitle>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}

export default SalesDeposits;