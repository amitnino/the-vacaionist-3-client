import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT, SET_ALERT } from '../../reducers/actionNames';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import ApiService from '../../api';

const VacationsChart = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer)
    const [chartData, setChartData] = useState(undefined)

    const handleHomeBtn = () => {
        history.push('/')
    }

    useEffect(() => {
        (async () => {

            const data = await ApiService('GET', 'vacations/chart',null,{ 'Authorization': user.token })

            if (data.err) {
                const msg = data.msg.split(']')[1]
                dispatch({ type: SET_ALERT, payload: { severity: 'error', msg: msg } })
                dispatch({ type: LOGOUT })
                history.push('/')
                return
            }
            if (!data.chart.length) {

                return
            }
            const newArr = data.chart.map(v => { return { 'name': v.title, 'follows': v.followed } })
            setChartData(newArr)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Grid
                container
                spacing={1}
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
            >
                <Box
                    style={{
                        height: '700px',
                        width: '70%',
                        boxShadow: '0 3px 8px 5px rgba(0, 0, 0, .2)',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderRadius: '3%'
                    }}
                >
                    {chartData ?
                        <VictoryChart
                            horizontal
                            domainPadding={20}
                            theme={VictoryTheme.material}
                        >
                            <VictoryBar
                                data={chartData}
                                x='name'
                                y='follows'
                            />
                        </VictoryChart>
                        :
                        <Typography variant="h4" align='center' color="initial">Sorry... none of the vacations is followed</Typography>
                    }
                </Box>
                <Box style={{ height: '50px' }} />
                <Button
                    variant="contained"
                    style={{ fontSize: '30px' }}
                    color="primary"
                    size='large'
                    onClick={handleHomeBtn}
                >
                    <HomeIcon color='inherit' style={{ fontSize: '30px' }} />
                    Home
            </Button>
            </Grid>
        </>
    )
}

export default VacationsChart
