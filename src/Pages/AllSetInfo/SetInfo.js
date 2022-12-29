import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BookingModal from '../BookingModal/BookingModal';
import Button from '@mui/material/Button';

const SetInfo = () => {
    const [allSeat,setAllSeat] = useState([]);
    const [modalData,setModalData] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleOpen = (e,data) => {
        setOpen(e);
        setModalData(data);
    }
    const handleClose = () => setOpen(false);
    useEffect(()=>{
        fetch("https://seat-booking.onrender.com/allSeatInfo")
        .then(res => res.json())
        .then(data => setAllSeat(data))
    },[handleOpen])
    return (
        <Box sx={{mx:2,my:5}}>
            <Box>
                <h2>Book The Seat</h2>
            </Box>
            <Box
            style={{
                display:"grid",
                gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
            }}
            >
                {
                    allSeat.map((seat)=><Paper
                    key={seat._id}
                    sx={{height: 80,width: 120,    
                    backgroundColor:seat.booked?"#b4a258":"#ffcc00",
                    p:1,borderRadius:"10px",m:1,cursor:"pointer"}}> 
                     <Typography sx={{fontWeight:600}} variant="h6" gutterBottom>
                        {seat.seatNo}
                    </Typography>
                    {
                        seat.booked?<Typography sx={{fontWeight:500}} variant="body1" gutterBottom>
                        Already Booked
                        </Typography>:
                        <Button style={{backgroundColor:'#23272b',color:"#fff"}} onClick={()=>handleOpen(true,seat)}>Book Now</Button>
                    }
                    
                  </Paper>)
                }
                
            </Box>
            <BookingModal
            open={open}
            handleClose={handleClose}
            modalData={modalData}
            >

            </BookingModal>
        </Box>
    );
};

export default SetInfo;