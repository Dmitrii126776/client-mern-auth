import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {useEffect, useState} from "react";
import $api from "../http";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import AnimalsDialogGallery from "./AnimalsDialogGallery";
import Loader from "../components/Loader";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import AnimalDialog from "./AnimalDialog";

export default function AnimalsGallery() {
    const [loading, setLoading] = useState(true);
    const [animals, setAnimals] = useState([]);

    const [animal, setAnimal] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');


    const getAnimals = () => {
        $api.get('/animals')
            .then(res => {
                setAnimals(res.data)
                setLoading(false);
            }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getAnimals()
    }, [])

    const moveToAnimal = (id) => {
        const selectedAnimal = animals.find(el => el._id === id);
        setAnimal(selectedAnimal || null);
        setOpen(true);
    };

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.up('xs'));
    const matchesSm = useMediaQuery(theme.breakpoints.up('sm'));
    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchesLg = useMediaQuery(theme.breakpoints.up('lg'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

    return (
        <>
            {loading ? (
                <div>
                    <Loader/>
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="min-vh-100">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            position: 'relative',
                            marginTop: "20px",
                            marginBottom: "20px",
                        }}
                    >
                        <AnimalsDialogGallery animals={animals}/>
                        {animal && (
                            <AnimalDialog animal={animal} open={open} scroll={scroll} setOpen={setOpen}/>
                        )}
                        <h1 style={{
                            margin: 0,
                            marginRight: isSmallScreen ? '30px' : 'auto',
                            transform: isSmallScreen ? 'none' : 'translateX(-50%)',
                            position: isSmallScreen ? 'relative' : 'absolute',
                            left: isSmallScreen ? 'auto' : '50%',
                        }}>
                            Gallery
                        </h1>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        {/*<div style={{display: 'flex', justifyContent: 'center', width: '90%', margin: '0 auto'}}>*/}
                        <ImageList spacing={8} cols={cols} sx={{m: 1, maxWidth: "1440px"}} data-testid="images-list">
                            {animals.map((animal, index) => (
                                <ImageListItem key={index}
                                    // data-testid={`images-item-${index}`}
                                               onClick={() => moveToAnimal(animal._id)}
                                               data-testid="images-item"
                                               sx={{
                                                   m: 0.5, maxWidth: 290, maxHeight: 217, cursor: 'pointer',
                                                   '&:hover img': {
                                                       transform: 'scale(1.05)',
                                                       transition: 'transform 0.3s ease-in-out',
                                                   }
                                               }}>
                                    <LazyLoadImage
                                        // srcSet={`${animal?.mainPhoto}?w=290&h=217&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${animal?.mainPhoto}?w=290&h=217&fit=crop&auto=format`}
                                        alt={animal?.name}
                                        effect="blur"
                                        loading="lazy"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            borderRadius: '6px',
                                            objectFit: 'cover',
                                            boxShadow: '2px 2px 2px #888888',
                                        }}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </div>
            )}
        </>
    );
}
