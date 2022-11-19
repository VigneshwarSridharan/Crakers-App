
import { Typography } from "@mui/material"
import { css } from "@emotion/css";
import { theme } from "../configs/theme";

const Counter = ({ value = 0, onChange = () => { } }) => {

    return (
        <>
            <div className={css({ backgroundColor: theme.palette.info.main, color: 'white', display: 'flex', fontWeight: 'bold', borderRadius: 30 })}>
                <div onClick={() => onChange(value !== 0 ? value - 1 : value)} className={css({ height: 30, width: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' })}><Typography>-</Typography></div>
                <div className={css({ height: 30, width: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' })}><Typography>{value}</Typography></div>
                <div onClick={() => onChange(value + 1)} className={css({ height: 30, width: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' })}><Typography>+</Typography></div>
            </div>
        </>
    )
}

export default Counter