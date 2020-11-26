import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import PurchaseForm from './components/form';

const hdcTheme = createMuiTheme({
    palette: {
      primary: {
        main: orange[500]
      }
    }
  });

  const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
        fontFamily: 'Roboto',
        // fontSize: 'calc(6px + 2vmin)',
        padding: 'calc(2px + 2vmin)'
    }
  })
);

function App() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={hdcTheme}>
            <Container maxWidth="sm">
                <div className={classes.root}>
                    <PurchaseForm />
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default App;
