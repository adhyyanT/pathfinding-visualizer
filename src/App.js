import NavBar from './Components/Navbar/NavBar';
import PathFind from './Components/PathFind/PathFind';
import Container from '@mui/material/Container';
function App() {
  return (
    <Container maxWidth={false}>
      <NavBar></NavBar>
      <PathFind></PathFind>
    </Container>
  );
}

export default App;
