import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CustomCard(props) {
    const { title, data, data1, imgs, onEdit, onDelete } = props;

    return (
        <Card sx={{
            height: 250,
            width: 350,
            borderRadius: 5,
            backgroundColor: '#00ff1a2b',
            position: 'relative',
            transition: 'box-shadow 0.3s',
            '&:hover': {
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' 
            }
        }}>
            <CardContent sx={{
                marginTop: '20px',
                '&:hover': {
                    cursor: 'pointer', 
                }
            }}>
                <Typography>
                    <img src={imgs} style={{ height: '75px', float: 'right' }} alt="Thumbnail" />
                </Typography>
                <Typography sx={{ fontSize: 24, fontFamily: 'Poppins, sans-serif', marginTop: '20px' }} color="#000000" gutterBottom>
                    {title}
                </Typography>

                <Typography sx={{ mb: 1.5, fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: 20 }} color="text.secondary">
                    {data}
                </Typography>

                <Typography sx={{ mb: 1.5, fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: 20 }} color="text.secondary">
                    {data1}
                </Typography>
            </CardContent>
            <CardActions style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <IconButton onClick={onEdit} style={{ color: 'blue' }}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={onDelete} style={{ color: 'red' }}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
