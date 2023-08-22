import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingBox = () => {
    return (
        <>
            <Box
                sx={{
                    minHeight: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: "#003366",
                }}>
                <CircularProgress className='text-white' />
            </Box>
        </>
    )
}

export default LoadingBox