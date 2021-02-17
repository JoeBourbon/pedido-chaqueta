import React, { useContext} from 'react';
import { DataGrid } from '@material-ui/data-grid';

import { DataContext } from './dataContext';

export default function ListAll() {
    const chaquetas = useContext(DataContext);

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'genero', headerName: 'Género' },
        { field: 'talla', headerName: 'Talla' },
        { field: 'color', headerName: 'Color' },
      ];

    return (
        <DataGrid autoHeight rows={chaquetas} columns={columns} pageSize={15} />
    )
}
