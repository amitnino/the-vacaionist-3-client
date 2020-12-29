import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Login from './Login';
import Register from './Register';
import { Grid, makeStyles } from '@material-ui/core';


function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel${index}`}
    >
      {value === index && (
        <Box p={3}>
          <>
            {children}
          </>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  authCon: {
    height: '100%',
  },
  authBox: {
    boxShadow: '15px',
    backgroundColor:'rgba(255,255,255,0.8)',

  }
})

const Auth = () => {

  const [value, setValue] = useState(0)

  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box
      component={Grid}
      className={classes.authCon}
      container
      direction="row"
      justify="center"
      alignItems="center"

    >
      <Box item sm={12} md={4} className={classes.authBox} component={Grid} boxShadow={7}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="">
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register handleChange={handleChange} />
        </TabPanel>
      </Box>
    </Box>
  )
}

export default Auth
