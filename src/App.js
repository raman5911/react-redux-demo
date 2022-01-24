import React from 'react';
import { Container, Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';

import DialogComponent from './components/DialogComponent';
import TableComponent from './components/TableComponent';

function App() {

  const reduxState = useSelector((state) => state);
  console.log(reduxState);

  return (
    <div className="App">
      <Container maxWidth="lg" minWidth="sm">
        <Grid container>
          <Grid item className="item">

            <h1>Manage Users</h1>

            {/* Dialog box for submitting form */}
            <DialogComponent></DialogComponent>

          </Grid>
        </Grid>
        <Grid container>
          <Grid item className="item">

            {/* Table Component for showing all the user data from redux state */}
            <TableComponent></TableComponent>

          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
