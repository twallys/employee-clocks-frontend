import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Button, Modal, Card, CardHeader, CardContent, TextField, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import api from '../../services/api';
import { IState } from '../../store';
import { IAppointment, IClocksState } from '../../store/modules/clocks/types';


import { Form } from './styles';
import { ILogin } from '../../store/modules/login/types';

interface AppointmentRequest {
    time: string;
    type: string;
}


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '5%',
        marginBottom: 20,
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    tableContainer: {
        // maxHeight: 1500
        height: 500
    },
    tableContainerStatus: {
        // maxHeight: '1500px'
        height: 500
    },

    header: {
        textAlign: 'center',
        background: '#212121',
        color: '#fff'
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    addButton: {
        marginTop: '10px',
        marginBottom: '10px',
        background: '#212aa5',
        color: '#000',
        // position: 'absolute',
        // right: 12,
        // bottom: 12,
        // zIndex: 99
    }
}));

function ClocksList() {
    const dispatch = useDispatch();
    const loggedUser = useSelector<IState, ILogin>(state => state.login.data);
    const clockList = useSelector<IState, IClocksState>(state => state.clocks);
    const appointment = useSelector<IState, IAppointment>(state => state.clocks.appointment);

    const [isDisabled, setIsDisabled] = React.useState(false);
    const [type, setType] = React.useState('');
    const [time, setTime] = React.useState('');

    const classes = useStyles();

    useEffect(() => {
        api.get('/appointments').then(response => {
            dispatch({
                type: 'GET_APPOINTMENTS',
                payload: response.data,
            })
        })
            .catch(error => {
                dispatch({
                    type: 'GET_APPOINTMENTS',
                    payload: [],
                })
            })
    }, [dispatch]);



    async function handleGetAppointment(id: string) {

        await api.get(`/appointments/${id}`).then(response => {
            dispatch({
                type: 'GET_APPOINTMENT',
                payload: response.data,
            })
        })
            .catch(error => {
                dispatch({
                    type: 'GET_APPOINTMENT',
                    payload: {},
                })
            })
    }

    async function handleNewClock(appointmentTime: AppointmentRequest) {

        await api.post('/appointments/', { clocks_in: appointmentTime.time, provider_id: loggedUser.id, date: new Date() }).then(response => {
            dispatch({
                type: 'NEW_APPOINTMENT',
                payload: response.data,
            })
        })
            .catch(error => {
                dispatch({
                    type: 'NEW_APPOINTMENT_FAILED',
                })
            })
    }

    async function handleEditClock(appointmentTime: AppointmentRequest) {

        let clocks_out_lunch = '';
        let clocks_in_lunch = '';
        let clocks_out = '';
        switch (type) {
            case 'col': clocks_out_lunch = appointmentTime.time;
                break;
            case 'cil': clocks_in_lunch = appointmentTime.time;
                break;
            case 'co': clocks_out = appointmentTime.time;
                break;

            default:
                break;
        }

        await api.put(`/appointments/${appointment.id}`, { clocks_out_lunch, clocks_in_lunch, clocks_out }).then(response => {
            dispatch({
                type: 'UPDATE_APPOINTMENT',
                payload: response.data,
            })
        })
            .catch(error => {
                dispatch({
                    type: 'UPDATE_APPOINTMENT_FAILED',
                })
            })
    }


    const handleOpen = () => {

        setType('ci');;
        setIsDisabled(true);

        dispatch({
            type: 'OPEN_MODAL',
        })
    };

    const handleClose = () => {
        setType('');;
        setIsDisabled(false);
        setTime('');
        dispatch({
            type: 'CLOSE_MODAL',
        })
    };

    return (
        <>
            <Paper className={classes.root}>
                <TableContainer className={classes.tableContainerStatus}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Data</TableCell>
                                <TableCell align="center">Clocks In</TableCell>
                                <TableCell align="center">Clocks Out Lunch</TableCell>
                                <TableCell align="center">Clocks In Lunch</TableCell>
                                <TableCell align="center">Clocks Out</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clockList.data.length === 0 ? (
                                <TableRow key="key">
                                    <TableCell className="font-bold" component="th" scope="row">
                                        A fila está vazia.
                                                </TableCell>
                                </TableRow>
                            ) : (
                                    <>
                                        {clockList.data.map((clock) => (
                                            <TableRow key={clock.id}>
                                                <TableCell className="font-bold" component="th" scope="row">
                                                    {clock.date}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {clock.clocks_in}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {clock.clocks_out_lunch}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {clock.clocks_in_lunch}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {clock.clocks_out}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button onClick={() => handleGetAppointment(clock.id)}>
                                                        <EditIcon></EditIcon>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                    </>
                                )}

                        </TableBody>
                    </Table>
                </TableContainer>
                <Button className={classes.addButton} onClick={handleOpen}>
                    <AddIcon></AddIcon>
                </Button>
            </Paper>

            <Modal
                open={clockList.modal}
                onClose={handleClose}
            >
                <Form noValidate autoComplete="off">
                    <Card>
                        <CardHeader className={classes.header} title={isDisabled ? 'Clock In' : "Clocks In / Clock Out"} />
                        <CardContent>
                            <div>
                                <TextField
                                    fullWidth
                                    id="type"
                                    type="type"
                                    name="type"
                                    className='type'
                                    label="Type"
                                    placeholder="Type"
                                    margin="normal"
                                    select
                                    value={type}
                                    onChange={(ev) => setType(ev.target.value)}
                                    disabled={isDisabled}
                                >
                                    <option key='col' value='col'>Clocks Out Lunch</option>
                                    <option key='cil' value='cil'>Clocks In Lunch</option>
                                    <option key='co' value='co'>Clocks Out</option>
                                </TextField>
                                <TextField
                                    fullWidth
                                    id="time"
                                    type="text"
                                    label="Time"
                                    margin="normal"
                                    value={time}
                                    onChange={(ev) => setTime(ev.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                onClick={type === 'ci' ? () => handleNewClock({ type, time }) : () => handleEditClock({ type, time })}>
                                Clock In / Out
                            </Button>
                        </CardActions>
                    </Card>
                </Form>
            </Modal>
        </>
    );
}

export default ClocksList;
