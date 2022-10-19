import "./stock.styles.css";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

const Stock = ({data}) => {
    const {ticker, name, exchange_short, price, day_change} = data[0];

    return (
        <Card elevation={16} sx={{ mt: 4, px:2, mx: 'auto'}}>
            <Grid container spacing={2}>
                <Grid item xs={7} md={7}>
                    <Tooltip title="Company name and symbol">
                        <h4>{ticker} / {name} -- {exchange_short}</h4>
                    </Tooltip>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Tooltip title="Current stock price">
                        <h4>{price} $</h4>
                    </Tooltip>
                </Grid>
                <Grid item xs={2} md={2}>
                    <Tooltip title="The day change">
                        <h4>{day_change}%</h4>
                    </Tooltip>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Stock;