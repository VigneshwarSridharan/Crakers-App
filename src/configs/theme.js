import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const spacing = 4;

export const theme = createTheme({
    spacing,
    palette: {
        primary: {
            main: red.A200
        }
    },
    typography: {
        fontFamily: "'Lato', sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    padding: theme.spacing(1.5, 3),
                    textTransform: 'none'
                })
            }
        }
    }
})

console.log(theme.spacing(1, 2, 3, 4))