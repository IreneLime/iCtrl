import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Alert, Autocomplete, Box, Dialog, DialogActions, DialogTitle, Tooltip, Typography} from '@material-ui/core';
import axios from 'axios';

import './index.css';
import {hostList} from '../../../actions/session';
import {LoadingButton} from '@material-ui/lab';
import {htmlResponseToReason} from '../../../actions/utils';

export default class NewSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false
        };
    }

    handleSubmit() {
        const host = document.getElementById('host').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (host.length === 0) {
            this.setState({
                error: `The 'Host' field cannot be empty`
            });
            return;
        } else if (username.length === 0) {
            this.setState({
                error: `The 'Username' field cannot be empty`
            });
            return;
        }

        this.setState({
            error: null,
            loading: true
        });

        axios.post('/session', {
            host, username, password
        }).then(_ => {
            window.location.reload();
        }).catch(error => {
            this.setState({
                error: htmlResponseToReason(error.response.data),
                loading: false
            });
        });
    }

    handleClose = (ev) => {
        if (ev.target && ev.target.id === 'button-save') {
            this.handleSubmit();
        } else {
            this.setState({
                error: null
            })
            this.props.onAddNewSessionClose();
        }
    };

    shiftFocus = (ev) => {
        // only shift the focus if the 'Enter'/'Return' key is pressed
        if (ev.key !== 'Enter') {
            return;
        }

        const id = ev.target.id;

        // all fields are required except 'password'
        if (id === 'password' && ev.target.value.length === 0) {
            return;
        }

        let nextField = null;

        if (id === 'host') {
            nextField = document.getElementById('username');
        } else if (id === 'username') {
            nextField = document.getElementById('password');
        } else if (id === 'password') {
            nextField = document.getElementById('button-save');
        } else {
            // should never reach here,
            //  or this callback is used in a wrong place
            throw Error('wrong branch');
        }

        nextField.focus();
    };

    render() {
        const {open} = this.props;
        const {error, loading} = this.state;
        return (
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={'xs'}
                aria-labelledby="new session"
            >
                <DialogTitle>Create New Session</DialogTitle>

                <div className={'new-session-content-wrapper'}>
                    <Box display={'flex'}>
                        <Tooltip flexGrow={1} title={'[Required] host name of the target SSH server'}>
                            <Typography variant={'subtitle1'}>Host<span style={{color: 'red'}}>*</span></Typography>
                        </Tooltip>
                        <Autocomplete
                            id={'host'}
                            options={hostList()}
                            clearOnBlur={false}
                            freeSolo={true}
                            autoComplete={true}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    autoFocus
                                    size={'small'}
                                    placeholder={'example.com'}
                                    variant={'standard'}
                                    style={{width: 250}}
                                />
                            )
                            }
                            onKeyDown={this.shiftFocus}
                        />
                    </Box>
                    <Box display={'flex'}>
                        <Tooltip flexGrow={1} title={'[Required] username for login'}>
                            <Typography variant={'subtitle1'}>Username<span style={{color: 'red'}}>*</span></Typography>
                        </Tooltip>
                        <TextField id={'username'}
                                   autoComplete={'off'}
                                   style={{width: 250}}
                                   size={'small'}
                                   placeholder={'username'}
                                   variant={'standard'}
                                   onKeyDown={this.shiftFocus}
                        />
                    </Box>
                    <Box display={'flex'}>
                        <Tooltip flexGrow={1} title={'[Optional] password for login. ' +
                        'If left empty, you will need to enter the password at the next login. '}>
                            <Typography variant={'subtitle1'}>Password</Typography>
                        </Tooltip>
                        <TextField id={'password'}
                                   type={'password'}
                                   autoComplete={'off'}
                                   style={{width: 250}}
                                   size={'small'}
                                   placeholder={'****'}
                                   variant={'standard'}
                                   onKeyDown={this.shiftFocus}
                        />
                    </Box>
                    {Boolean(error) && <Alert severity="error">{error}</Alert>}
                </div>
                <DialogActions>
                    <Button disabled={loading} onClick={this.handleClose}>Close</Button>
                    <LoadingButton variant={'contained'}
                                   id={'button-save'}
                                   loading={loading}
                                   loadingIndicator={'Saving...'}
                                   onClick={this.handleClose}>
                        Save
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        );
    }
}