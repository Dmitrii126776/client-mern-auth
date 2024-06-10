import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {LazyLoadImage} from "react-lazy-load-image-component";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {useMemo, useState} from "react";

export default function AnimalDialog(props) {
    const {animal, open, setOpen, scroll} = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const mainPhotoIndex = useMemo(() => animal.photos.indexOf(animal.mainPhoto), [animal]);

    const [selectedIndex, setSelectedIndex] = useState(mainPhotoIndex);

    const handleClose = () => {
        setSelectedIndex(mainPhotoIndex);
        setOpen(false);
    };

    const handleImageClick = (index) => {
        setSelectedIndex(index)
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
            setSelectedIndex(mainPhotoIndex);
        }
    }, [open, animal, mainPhotoIndex]);


    const matchesXs = useMediaQuery(theme.breakpoints.up('xs'));
    const matchesSm = useMediaQuery(theme.breakpoints.up('sm'));
    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchesLg = useMediaQuery(theme.breakpoints.up('lg'));

    let cols = 2;
    if (matchesLg) {
        cols = 5;
    } else if (matchesMd) {
        cols = 4;
    } else if (matchesSm) {
        cols = 3;
    } else if (matchesXs) {
        cols = 2;
    }

    if (!animal) {
        return null;
    }

    const images = animal.photos.map((photo) => ({
        original: photo,
        thumbnail: photo,
    }));

    return (
        <React.Fragment>
            <Dialog open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    fullScreen={fullScreen}
                    sx={{
                        '& .MuiDialog-paper': {
                            width: '80%',
                            maxWidth: '1440px',
                        }
                    }}
            >
                <DialogTitle id="scroll-dialog-title">{animal?.name}</DialogTitle>
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
                        <div style={{borderRadius: '6px', boxShadow: '1px 1px 2px 2px #888888'}}>
                            <ImageGallery
                                items={images}
                                startIndex={selectedIndex}
                                showThumbnails={false}
                                showFullscreenButton={true}
                                showPlayButton={false}
                                onSlide={(index) => setSelectedIndex(index)}
                                styles={{
                                    image: {
                                        borderRadius: '6px',
                                        boxShadow: '2px 2px 2px #888888',
                                    },
                                }}
                            />
                        </div>
                        {/*<img*/}
                        {/*    src={selectedImage}*/}
                        {/*    alt={animal?.name}*/}
                        {/*    loading="lazy"*/}
                        {/*    style={{*/}
                        {/*        maxWidth: '100%',*/}
                        {/*        maxHeight: '100%',*/}
                        {/*        borderRadius: '6px',*/}
                        {/*        objectFit: 'cover',*/}
                        {/*        boxShadow: '2px 2px 2px #888888',*/}
                        {/*        cursor: 'pointer',*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <ImageList spacing={8} cols={cols} sx={{m: 2, maxWidth: "1440px"}}>
                                {animal.photos.map((photo, index) => (
                                    <ImageListItem key={index} style={{
                                        marginRight: '10px'
                                    }}>
                                        <LazyLoadImage
                                            src={`${photo}?w=290&h=217&fit=crop&auto=format`}
                                            alt={animal?.name}
                                            effect="blur"
                                            loading="lazy"
                                            onClick={() => handleImageClick(index)}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                borderRadius: '6px',
                                                objectFit: 'cover',
                                                border: index === selectedIndex ? '4px solid red' : '',
                                                boxShadow: index === selectedIndex ? '2px 2px 2px #888888' : '',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
