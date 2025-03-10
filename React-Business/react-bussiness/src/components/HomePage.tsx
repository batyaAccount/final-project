import { Container, Typography } from "@mui/material";


const HomePage = () => {

    return (
        <Container 
            maxWidth="lg" 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100vh', 
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                The Recipes House
            </Typography>
            <Typography variant="h5" component="p" align="center" gutterBottom>
                Discover a variety of delicious recipes from around the world.
            </Typography>
         
        </Container>
    );

}

export default HomePage