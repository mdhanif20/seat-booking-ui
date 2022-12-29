import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"10px"
  };

const BookingModal = ({open,handleClose,modalData}) => {
    const defaultInfo = {
        name:"",
        email:"",
        phoneNumber:""
    }
    const [bookingInfo,setBookingInfo] = useState(defaultInfo); 
    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = {...bookingInfo};
        newInfo[field] = value
        setBookingInfo(newInfo);
    }
    const bookinData = {
        ...bookingInfo,
        seatNo:`${modalData.seatNo}`,
        booked: true
    }

    const bookingSeat = (id) =>{
        if(bookinData.name == "" && bookinData.email == "" && bookinData.phoneNumber==""){
            alert("Please, fill up properly name, email and phone number")
        }else{
            const url = `https://seat-booking.onrender.com/bookingSeat/${id}`;
            fetch(url,{
                method:"PUT",
                headers:{
                    'content-type':"application/json"
                },
                body: JSON.stringify(bookinData)
            })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    alert("Booked Successfully!!")
                }
            })
        } 
    }

    return (
        <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        style={{border:0}}
      >
            <Box sx={style}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                Seat No: {modalData.seatNo}
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                <TextField
                sx={{width:"100%",my:1}}
                label="Your Name"
                name="name"
                onBlur={handleOnBlur}
                id="outlined-size-small"
                defaultValue="Name"
                size="small"
                />
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                <TextField
                sx={{width:"100%",my:1}}
                label="Your Email"
                name="email"
                onBlur={handleOnBlur}
                id="outlined-size-small"
                defaultValue="Email"
                size="small"
                />
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                <TextField
                sx={{width:"100%",my:1}}
                label="Enter Your Phone Number"
                name="phoneNumber"
                onBlur={handleOnBlur}
                id="outlined-size-small"
                defaultValue="Phone Number"
                size="small"
                />
            </Typography>
            <br />
            <Button onClick={()=>bookingSeat(`${modalData._id}`)} style={{backgroundColor:'#23272b',color:"#fff",mt:3}}>Book Now</Button>
            </Box>
      </Modal>
    );
};

export default BookingModal;