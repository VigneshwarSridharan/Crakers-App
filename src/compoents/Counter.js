
import { Button, ButtonGroup, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { css } from "@emotion/css";
import { theme } from "../configs/theme";

const Counter = ({ value = 0, onChange = () => { } }) => {

    return (
        <>
        <div className={css({backgroundColor:theme.palette.info.main,color:'white',display:'flex',fontWeight:'bold',borderRadius:30})}>
            <div onClick={() => onChange(value != 0 ? value - 1 : value)} className={css({height: 30, width:30, display:'flex',alignItems:'center', justifyContent:'center'})}><Typography>-</Typography></div>
            <div className={css({height: 30, width:30, display:'flex',alignItems:'center', justifyContent:'center'})}><Typography>{value}</Typography></div>
            <div onClick={() => onChange(value + 1)} className={css({height: 30, width:30, display:'flex',alignItems:'center', justifyContent:'center'})}><Typography>+</Typography></div>
        </div>
        {/* <ButtonGroup color="info" disableElevation size="small">
            <Button size="small" variant="contained" > <RemoveIcon /> </Button>
            <Button size="small" >{value}</Button>
            <Button size="small" variant="contained" > <AddIcon /> </Button>
        </ButtonGroup> */}
        </>
    )
}

export default Counter