import React, { useContext} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { DataContext } from './dataContext';

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

export default function ResponseForm() {
    const classes = useStyles();
    const { nombre, genero, talla, color } = useContext(DataContext);

    return (
        <Box justifyContent="center">
            <Box display="flex">
                <ThumbUpIcon />
                <Typography variant="body1" component="p" gutterBottom>
                    Ok. Hemos recibido tu pedido con estos datos:
                </Typography>
            </Box>
            <Typography variant="body1" component="p" gutterBottom>
                {`Nombre: ${nombre}`}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
                {`Género: ${genero}`}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
                {`Talla: ${talla}`}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
                {`Color: ${color}`}
            </Typography>

            <Typography variant="body1" component="p" gutterBottom>
                Te avisaremos por Whatsapp cuando la tengamos y puedas pasar a
                por ella.
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
                Hala! a pasarlo bien.
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
                Larga vida al HDC Alicante
            </Typography>
        </Box>
    );
}
