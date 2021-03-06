import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import { auth, createChaqueta, getChaquetas } from '../firebase/utils';
import { DataContext } from './dataContext';
import ResponseForm from './response';
import ListAll from './listAll';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '100%',
            },
            color: '#282c34',
        },
        topSpace: {
            fontWeight: 'bold',
            marginTop: '2em',
        },
    })
);

export default function PurchaseForm() {
    const classes = useStyles();

    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [talla, setTalla] = useState('');
    const [color, setColor] = useState('');
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [listData, setListData] = useState(false);
    const [chaquetas, setChaquetas] = useState(null);
    const [finalizado, setFinalizado] = useState(true);

    const e = 'infocontacto@hdcalicante.com';
    const p = '34414*HdcAlc';
    
    useEffect(() => {
        const user = getUser();
        if (formData) {
            createChaqueta(user, formData);
            setSubmitted(true);
        }
        if (chaquetas) {
            setLoading(false);
            setListData(true);
        }
    }, [formData, chaquetas]);

    const getUser = async () => {
        try {
            const response = await auth.signInWithEmailAndPassword(e, p);
            setLoading(false);
            return(response);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        setFormData({
            nombre,
            genero,
            talla,
            color,
        });
    };

    const listChaquetas = async () => {
        const user = getUser();
        setLoading(true);
        const cha = await getChaquetas(user);
        setChaquetas(cha);
    }

    if (loading) {
        return (
            <Box justifyContent="center">
                <CircularProgress />
            </Box>
        )
    }

    if (submitted) {
        return (
            <DataContext.Provider value={formData}>
                <ResponseForm />
                <Button
                    className={classes.topSpace}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setSubmitted(false);
                        setFormData(null);
                    }}
                >
                    Terminar
                </Button>
            </DataContext.Provider>
        )
    }

    if (finalizado) {
        return (
            <Box justifyContent="center">
                <Typography>Este Pedido ya está cerrado</Typography>
                <Button
                    className={classes.topSpace}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setFinalizado(false);
                        setListData(true);
                    }}
                >
                    Ver lista de pedido
                </Button>
            </Box>
        )
    }

    if (listData) {
        return (
            <DataContext.Provider value={chaquetas}>
                <Box height={400} justifyContent="center">
                    <ListAll />
                </Box>
                <Button
                    className={classes.topSpace}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setChaquetas(null);
                        setListData(false);
                        setFinalizado(true);
                    }}
                >
                    Terminar
                </Button>
            </DataContext.Provider>
        )
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Typography 
                variant="h4"
                component="h4"
                color="primary" 
                onClick={listChaquetas}
            >
                Pedido Chaqueta HDC Alicante
            </Typography>
            <Typography variant="subtitle1" component="p">
                Rellena los siguientes campos y pulsa el botón ENVIAR que hay al
                final del formulario
            </Typography>
            <Typography
                className={classes.topSpace}
                variant="body1"
                component="p"
                gutterBottom
            >
                Escribe aquí tu Nombre
            </Typography>
            <TextField
                required
                className={classes.fields}
                id="nombre"
                label="Nombre"
                fullWidth
                variant="filled"
                onChange={(event) => setNombre(event.target.value)}
            />

            <Typography
                className={classes.topSpace}
                variant="body1"
                component="p"
                gutterBottom
            >
                Selecciona si es para Chica o Chico
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="genero"
                    name="genero"
                    onChange={(event) => setGenero(event.target.value)}
                >
                    <FormControlLabel
                        value="chica"
                        control={<Radio required />}
                        label="Chica"
                    />
                    <FormControlLabel
                        value="chico"
                        control={<Radio required />}
                        label="Chico"
                    />
                </RadioGroup>
            </FormControl>

            <Typography
                className={classes.topSpace}
                variant="body1"
                component="p"
                gutterBottom
            >
                Selecciona la Talla
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="talla"
                    name="talla"
                    onChange={(event) => setTalla(event.target.value)}
                >
                    <FormControlLabel value="S" control={<Radio required />} label="S" />
                    <FormControlLabel value="M" control={<Radio required />} label="M" />
                    <FormControlLabel value="L" control={<Radio required />} label="L" />
                    <FormControlLabel
                        value="XL"
                        control={<Radio required />}
                        label="XL"
                    />
                    <FormControlLabel
                        value="XXL"
                        control={<Radio required />}
                        label="XXL"
                    />
                    <FormControlLabel
                        value="XXXL"
                        control={<Radio required />}
                        label="XXXL"
                    />
                    <FormControlLabel
                        value="XXXXL"
                        control={<Radio required />}
                        label="XXXXL"
                    />
                </RadioGroup>
            </FormControl>

            <Typography
                className={classes.topSpace}
                variant="body1"
                component="p"
                gutterBottom
            >
                Selecciona el Color
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="color"
                    name="color"
                    onChange={(event) => setColor(event.target.value)}
                >
                    <FormControlLabel
                        value="Negro"
                        control={<Radio required />}
                        label="Negro (02)"
                    />
                    <FormControlLabel
                        value="Rojo"
                        control={<Radio required />}
                        label="Rojo (60)"
                    />
                    <FormControlLabel
                        value="Azul Agua Marina"
                        control={<Radio required />}
                        label="Azul Agua Marina (236)"
                    />
                    <FormControlLabel
                        value="Azul Royal"
                        control={<Radio required />}
                        label="Azul Royal (05)"
                    />
                    <FormControlLabel
                        value="Azul Marino"
                        control={<Radio required />}
                        label="Azul Marino (55)"
                    />
                    <FormControlLabel
                        value="Lima"
                        control={<Radio required />}
                        label="Lima (235)"
                    />
                </RadioGroup>
            </FormControl>

            <Button
                type="submit"
                className={classes.topSpace}
                variant="contained"
                color="primary"
            >
                ENVIAR
            </Button>

        </form>
    );
}
