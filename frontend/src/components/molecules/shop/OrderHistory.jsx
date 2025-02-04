import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, CssBaseline, createTheme, ThemeProvider, Tooltip } from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
    typography: {
        h4: {
            fontWeight: 700,
        },
    },
});

const StyledCellContent = styled.div`
  max-height: 40px; 
  overflow-y: auto; 
  white-space: normal;
  word-wrap: break-word;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StyledContainer = styled(Container)`
  margin-top: 2rem;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
`;

const StyledDataGrid = styled(DataGrid)`
  & .MuiDataGrid-row:hover {
    background-color: #e3f2fd;
  }
  & .MuiDataGrid-columnHeaders {
    background-color: #ddd;
    // color: #ffffff;
    font-weight: bold;
  }
  & .MuiDataGrid-cell {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
  & .MuiDataGrid-row:nth-of-type(odd) {
    background-color: #fafafa;
  }
`;

const columns = [
    { field: 'customer_name', headerName: 'Customer', width: 220 },
    { field: 'amount_due', headerName: 'Amount Due', width: 130, valueFormatter: (value) => `CAD$ ${(value).toFixed(2)}` },
    { field: 'amount_paid', headerName: 'Amount Paid', width: 130, valueFormatter: (value) => `CAD$ ${(value).toFixed(2)}` },
    { field: 'currency', headerName: 'Currency', width: 100, valueFormatter: (value) => `${(value || '').toUpperCase()}` },
    { field: 'status', headerName: 'Status', width: 100, valueFormatter: (value) => `${(value || '').toUpperCase()}` },
    { field: 'created', headerName: 'Created', width: 200, valueFormatter: (value) => new Date(value).toLocaleString() },
    {
        field: 'product_details',
        headerName: 'Products',
        width: 300,
        renderCell: (params) => {
            const firstProduct = params?.value[0];
            const remainingProductCount = params?.value.length - 1;

            const truncatedTitle =
                firstProduct?.title?.length > 15
                    ? firstProduct?.title.slice(0, 15) + '...'
                    : firstProduct?.title;

            return (
                <Tooltip
                    title={
                        <div>
                            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                                {params.value.map((product, index) => (
                                    <li key={index}>
                                        {product?.title}(x{product?.quantity})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                    arrow
                >
                    <span>
                        {truncatedTitle}(x{firstProduct?.quantity})
                        {remainingProductCount > 0 && ` + ${remainingProductCount} more`}
                    </span>
                </Tooltip>
            );
        },
    }
];


const OrderHistoryTable = () => {
    const [orderHistoryData, setOrderHistoryData] = useState([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const userEmail = localStorage.getItem('userEmail');
            const endpoint = `${import.meta.env.VITE_NODE_BACKEND_URL}/order/fetch-all/${userEmail}`;
            const headers = { 'Content-Type': 'application/json' };

            try {
                const response = await axios.get(endpoint, { headers });
                console.log('Order history:', response.data.orders);
                const orders = response.data.orders.map((order, index) => {
                    return {
                        id: index + 1,
                        ...order
                    };
                });
                setOrderHistoryData(orders);
            }
            catch (error) {
                console.error('Error fetching order history:', error);
            }
        }

        fetchOrderHistory();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StyledContainer maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    Order History
                </Typography>
                <div style={{ height: 500, width: '100%' }}>
                    <StyledDataGrid
                        rows={orderHistoryData}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </StyledContainer>
        </ThemeProvider>
    );
};

export default OrderHistoryTable;