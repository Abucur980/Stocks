import * as React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stock from './components/stock/stock.components';
// import CircularProgress from '@mui/material/CircularProgress';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [stockData, setStockData] = useState(null);
  
  useEffect(() => {
    fetch("https://api.stockdata.org/v1/entity/search?search="+searchValue+"&api_token=QmFKRT6W15LPEAr3fxI5UP9FL4dmOlGdHmmRFfnj")
    .then((rawData) => rawData.json())
    .then((jsonData) => jsonData.data.filter(data => data.country === 'us' && (data.exchange === "NYSE" || data.exchange === "NASDAQ")))
    .then((filteredData) => setSearchList(filteredData))
  }, [searchValue]);

  function returnStock() {
    if (stockData !== null) {
      return (<Stock data={stockData}/>)
    }
  }

  // reset the search value and list if dropdown is closed
  useEffect(() => {
    if (!open) {
      setSearchList([]);
      setSearchValue('');
    }
  }, [open]);

  useEffect(() => {
    if (selectedValue !== null) {
    fetch("https://api.stockdata.org/v1/data/quote?symbols="+selectedValue.symbol+"&api_token=QmFKRT6W15LPEAr3fxI5UP9FL4dmOlGdHmmRFfnj")
    .then((rawData) => rawData.json())
    .then((jsonData) => setStockData(jsonData.data));
    }
  }, [selectedValue]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="sm">
            <Autocomplete
              autoComplete
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              options={searchList}
              freeSolo
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => setSelectedValue(value)}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.symbol}>
                    {option.symbol} --- {option.name}
                  </li>
                );
              }}
              renderInput={(params) => 
              <TextField 
                onChange={(event) => { setSearchValue(event.target.value) }}
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }} 
                label="What stocks are you looking for?"/>}
              />
              {returnStock()}
        </Container>
        
      </div>
    </ThemeProvider>
    
  );
}

export default App;
