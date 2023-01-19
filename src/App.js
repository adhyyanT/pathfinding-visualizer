import NavBar from './Components/Navbar/NavBar';
import PathFind from './Components/PathFind/PathFind';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const themeDark = createTheme({
  palette: {
    background: {
      default: '#989898',
    },
    text: {
      // primary: '#ffffff',
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <Container maxWidth={false}>
        <NavBar></NavBar>
        <PathFind></PathFind>
      </Container>
    </ThemeProvider>
  );
}

export default App;
