import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function AnimalsDialogGallery(props) {
    const {animals, images} = props;
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.up('xs'));
    const matchesSm = useMediaQuery(theme.breakpoints.up('sm'));
    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    let cols = 2;
    if (matchesMd) {
        cols = 4;
    } else if (matchesSm) {
        cols = 3;
    } else if (matchesXs) {
        cols = 2;
    }


    return (
        <React.Fragment>
            <Button onClick={handleClickOpen('paper')}
                    data-testid="button-see-dialog"
                    sx={{marginLeft: isSmallScreen ? '10px' : '30px'}}
                    variant="outlined">see dialog photos
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    sx={{
                        '& .MuiDialog-paper': {
                            width: '80%',
                            maxWidth: '1440px',
                        }
                    }}
            >
                {/*<DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>*/}
                <IconButton
                    data-testid="dialog-close-button"
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 12,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: "25px"}}>
                            {/*<div style={{display: 'flex', justifyContent: 'center', width: '90%', margin: '0 auto'}}>*/}
                            <ImageList spacing={8} cols={cols}
                                       data-testid="dialog-images-list"
                                       sx={{m: 1, width: '100%', maxWidth: "1440px"}}>
                                {animals.map((animal, index) => (
                                    <ImageListItem key={index}
                                        // data-testid={`dialog-images-item-${index}`}
                                                   data-testid="dialog-images-item"
                                                   sx={{
                                                       m: 0.5,
                                                       maxWidth: 290,
                                                       maxHeight: 217,
                                                       cursor: 'pointer',
                                                       '&:hover img': {
                                                           transform: 'scale(1.05)',
                                                           transition: 'transform 0.3s ease-in-out',
                                                       }
                                                   }}>
                                        <img
                                            // srcSet={`${animal?.mainPhoto}?w=290&h=217&fit=crop&auto=format&dpr=2 2x`}
                                            src={`${animal?.mainPhoto}?w=290&h=217&fit=crop&auto=format`}
                                            alt={animal?.name}
                                            loading="lazy"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                borderRadius: '6px',
                                                objectFit: 'cover',
                                                boxShadow: '2px 2px 2px #888888',
                                                // boxShadow: 3
                                            }}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </div>
                    </DialogContentText>
                </DialogContent>
                {/*<DialogActions>*/}
                {/*    <Button onClick={handleClose}>Cancel</Button>*/}
                {/*    <Button onClick={handleClose}>Subscribe</Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </React.Fragment>
    );
}
