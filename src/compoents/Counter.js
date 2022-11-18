
import { Button, ButtonGroup } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Counter = ({ value = 0, onChange = () => { } }) => {

    return (
        <ButtonGroup color="info" disableElevation size="small">
            <Button size="small" variant="contained" onClick={() => onChange(value - 1)}> <RemoveIcon /> </Button>
            <Button size="small" >{value}</Button>
            <Button size="small" variant="contained" onClick={() => onChange(value + 1)}> <AddIcon /> </Button>
        </ButtonGroup>
    )
}

export default Counter