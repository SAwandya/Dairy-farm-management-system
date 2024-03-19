import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Grid
} from '@mui/material';

function ProcessForm() {
  const [milkBatchId, setMilkBatchId] = useState('');
  const [milkQuantity, setMilkQuantity] = useState('');
  const [milkingDuration, setMilkingDuration] = useState('');
  const [qualityCheckResult, setQualityCheckResult] = useState(false);
  const [irregularities, setIrregularities] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Milk Batch ID"
              variant="outlined"
              value={milkBatchId}
              onChange={(e) => setMilkBatchId(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Milk Quantity"
              variant="outlined"
              value={milkQuantity}
              onChange={(e) => setMilkQuantity(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Milking Duration"
              variant="outlined"
              value={milkingDuration}
              onChange={(e) => setMilkingDuration(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  checked={qualityCheckResult}
                  onChange={(e) => setQualityCheckResult(e.target.checked)}
                />
              }
              label="Quality Check Result (Pass/Fail)"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Irregularities"
              variant="outlined"
              multiline
              rows={3}
              value={irregularities}
              onChange={(e) => setIrregularities(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="right">
            <Button type="submit" variant="contained" color="primary" sx={{ marginRight: '10px' }}>Submit</Button>
            <Button variant="outlined">Cancel Session</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default ProcessForm;
