import React from 'react';
import { Button } from '@mui/material';


const Home = () => {
    return (
        <div style={{
            backgroundImage: "url(/dog-walking.gif)",
            backgroundRepeat: "no-repeat",
            maxWidth: 'false',
            backgroundSize: "auto", backgroundPositionX: "center", backgroundPositionY: "center",
            backgroundColor: "#f6decf", top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            position: 'absolute'
        }}>
            <div style={{
                border: '3px solid #ffeadb',
                marginLeft: '2%',
                marginTop: '2%',
                marginRight: '2%',
                bottom: 2,
                borderRadius: '10px'
            }}>

                <div style={{
                    marginTop: '5%',
                    fontFamily: 'Montserrat',
                    fontSize: '20px',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <h2>Bem Vindo à PetTech!</h2>
                </div>
                <div style={{
                    marginTop: '-2.5%',
                    fontFamily: 'Montserrat',
                    fontSize: '13px',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <h2> Serviços de banho e tosa para seu pet.</h2>
                </div>

                <Button style={{
                    display: 'inline-block',
                    fontSize: '18px',
                    textAlign: 'center',
                    padding: '7px',
                    width: '15%',
                    cursor: 'pointer',
                    alignItems: 'center',
                    position: 'relative',
                    left: '34%',
                    marginTop: '23%',
                    marginBottom: '7%'
                }}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    href='/login'
                >
                    Faça seu login!
                </Button>
                <Button style={{
                    display: 'inline-block',
                    fontSize: '18px',
                    padding: '7px',
                    width: '15%',
                    textAlign: 'center',
                    cursor: 'pointer',
                    alignItems: 'center',
                    position: 'relative',
                    left: '34%',
                    marginTop: '23%',
                    marginBottom: '7%',
                    marginLeft: '2%'
                }}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    href='/cadastro'
                >
                    ou cadastre-se
                </Button>
            </div>
        </div>
    )

}

export default Home;