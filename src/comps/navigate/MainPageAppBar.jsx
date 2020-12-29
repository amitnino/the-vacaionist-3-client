import React from 'react'
import { Grid, Toolbar, Button, Typography, AppBar, InputBase, makeStyles, Box } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT, SEARCH } from '../../reducers/actionNames';
import { useHistory } from 'react-router-dom';
import ApiService from '../../api';

const useStyles = makeStyles({
    colorRoot: {
        color: 'white',
    },
    appBarCon: {
        paddingLeft: '20px'
    }
})

function MainPageAppBar() {

    const history = useHistory()
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = useSelector(state => state.authReducer)

    const handleLogout = async () => {

        await ApiService('POST', 'auth/logout',
        {
            token: user.accessToken
        })
        dispatch({ type: LOGOUT })
        history.push("/")
    }

    const handleCharts = () => {
        history.push('/chart')
    }

    const handleSearch = (value) => {
        dispatch({ type: SEARCH, payload: value })
    }

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        wrap="wrap"
                        className={classes.appBarCon}
                    >
                        <Grid
                            item
                            xs={12}
                            md={3}
                            container
                            spacing={4}
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                            wrap="nowrap"

                        >
                            <Grid item >
                                <Button
                                    classes={{
                                        root: classes.colorRoot,
                                    }}
                                    onClick={handleLogout}
                                >
                                    <ExitToAppIcon />
                                Logout
                            </Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" noWrap>
                                    Welcome Mr. {user.lname}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {user.role === 'admin' &&
                                    <Button
                                        onClick={handleCharts}
                                        variant="text"
                                        classes={{
                                            root: classes.colorRoot,
                                        }}
                                    >
                                        Charts
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography
                            style={{ margin: '5px 0px 5px 0px' }}
                            variant="h4"
                            color="initial"
                            align='center'
                            >
                            The Vacationist
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={3}
                            container
                            spacing={1}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="nowrap"

                        >
                            <Grid item>
                                <SearchIcon />
                            </Grid>
                            <Grid item>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.colorRoot,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={e => handleSearch(e.target.value)}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                </Toolbar>

            </AppBar>
                <Box style={{height:'110px'}}/>
        </>
    )
}

export default MainPageAppBar
