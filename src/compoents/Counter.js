
import { Button, ButtonGroup } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Counter = ({ value = 0, onChange = () => { } }) => {

    return (
        <ButtonGroup color="info" disableElevation>
            <Button variant="contained" onClick={() => onChange(value - 1)}> <RemoveIcon /> </Button>
            <Button>{value}</Button>
            <Button variant="contained" onClick={() => onChange(value + 1)}> <AddIcon /> </Button>
        </ButtonGroup>
    )
}

export default Counter