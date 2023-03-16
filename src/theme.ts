import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
export const theme = createTheme({
    palette: {
        primary: {
            main: '#367c2b',
        },
        secondary: {
            main: '#ffde00',
        },
        error: {
            main: '#c21020',
        },
    },
});
