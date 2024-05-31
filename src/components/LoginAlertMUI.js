import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {Box} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function LoginAlertMUI() {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        navigate('/login');
        // navigate(-1);
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                data-testid="alert-login-modal"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                    <h5 className="text-danger" style={{marginTop: '25px'}}>Sorry, you don't have access to this
                        page!</h5>
                    <h5 className="text-danger">Please, sign in using these credentials:</h5>
                </DialogTitle>
                <IconButton data-testid="close-button"
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', m: 1}}>
                        <TextField data-testid="alert-login-modal-input-email"
                                   sx={{m: 1, width: '25ch'}}
                                   id="outlined-read-only-input"
                                   label="Test email"
                                   defaultValue="selenium@mail.com"
                                   InputProps={{
                                       readOnly: true,
                                   }}
                        />
                        <TextField data-testid="alert-login-modal-input-password"
                                   sx={{m: 1, width: '25ch'}}
                                   id="outlined-read-only-input"
                                   label="Test password"
                                   defaultValue="1234"
                                   InputProps={{
                                       readOnly: true,
                                   }}
                        />
                    </Box>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', m: 1}}>
                        <TextField data-testid="alert-login-modal-input-email"
                                   sx={{m: 1, width: '25ch'}}
                                   id="outlined-read-only-input"
                                   label="Test Email"
                                   defaultValue="cypress@mail.com"
                                   InputProps={{
                                       readOnly: true,
                                   }}
                        />
                        <TextField data-testid="alert-login-modal-input-password"
                                   sx={{m: 1, width: '25ch'}}
                                   id="outlined-read-only-input"
                                   label="Test password"
                                   defaultValue="1234"
                                   InputProps={{
                                       readOnly: true,
                                   }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                            type="submit" fullWidth variant="contained"
                            data-testid="alert-login-modal-sign-in-button"
                            sx={{mt: 3, mb: 3}}>Sign in</Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
