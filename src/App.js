import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Auth from './comps/auth/Auth';
import VacationsList from './comps/vacations/VacationsList';
import VacationsChart from './comps/vacations/VacationsChart';
import { useSelector } from 'react-redux';
import { makeStyles, Box } from '@material-ui/core';
import MainPageAppBar from './comps/navigate/MainPageAppBar';
import Alerts from './comps/navigate/Alerts';

const useStyles = makeStyles({
  appCon:{
    height:'100vh',
    width:'99vw'
  },
  backgroundCon:{
    zIndex:'-9999',
    position: 'fixed',
    height:'100vh',
    width:'99vw',
    backgroundImage:`url("/pics/IMG_2057.jpg")`,
    backgroundSize:'cover',
    backgroundPosition:'center',
    opacity:'0.8'
    }
})

function App() {
  const user = useSelector(state => state.authReducer)
  const classes = useStyles()

  return (
    <div className={classes.appCon}>
      <Router>
          <Box className={classes.backgroundCon}/>
        { !user.isLoggedIn ? <Redirect to='/auth'/> : <MainPageAppBar /> }
        <Alerts />
         <Route path='/auth' component={Auth} />
         <Route path='/chart' >
           { !user.isLoggedIn ? <Redirect to='/auth'/> : <VacationsChart /> }
           </Route>
         <Route path='/' exact>
           { !user.isLoggedIn ? <Redirect to='/auth'/> : <VacationsList /> }
           </Route> 
      </Router>
    </div>
  );
}

export default App;
