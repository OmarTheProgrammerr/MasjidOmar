import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Button, TextField, Box } from "@mui/material";
import MuiAlert from "@mui/lab/Alert";
import { styled } from "@mui/system";
import "./Donation.css";

const DonationForm = styled("form")(({ theme }) => ({
  "& > *": {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Donation = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here you would process the donation
    // ...

    setMessage("Thank you for your donation...");
    setOpen(true);
    setTimeout(() => setOpen(false), 5000);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div>
      <h2>Donate to support our cause</h2>
      <p>Your donation helps us in our mission. Every dollar counts!</p>

      <DonationForm onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAmount("10")}
          >
            $10
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAmount("20")}
          >
            $20
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAmount("50")}
          >
            $50
          </Button>
        </Box>

        <Button type="submit" variant="contained" color="secondary">
          Donate
        </Button>
      </DonationForm>

      <Snackbar open={open} autoHideDuration={5000}>
        <Alert severity="success">{message}</Alert>
      </Snackbar>
    </div>
  );
};

export default Donation;
