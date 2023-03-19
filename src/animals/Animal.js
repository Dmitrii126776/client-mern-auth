// big image on top, text on bottom, nice on iphone, laptop so too big picture

// import {useParams} from 'react-router-dom';
// import {useEffect, useState} from "react";
// import axios from "axios";
// import {Galleria} from 'primereact/galleria';
//
// const Animal = () => {
//     const {id} = useParams();
//     const [animal, setAnimal] = useState({});
//
//     const [images, setImages] = useState(null);
//     const responsiveOptions = [
//         {
//             breakpoint: '991px',
//             numVisible: 5
//         },
//         {
//             breakpoint: '767px',
//             numVisible: 3
//         },
//         {
//             breakpoint: '575px',
//             numVisible: 1
//         }
//     ];
//
//     const itemTemplate = (item) => {
//         return <img src={item.src} alt={item.alt} style={{width: '100%'}}/>
//     }
//
//     const thumbnailTemplate = (item) => {
//         return <img src={item.src} alt={item.alt} style={{maxWidth: '100px', maxHeight: '100px'}}/>
//     }
//
//
//     useEffect(() => {
//         axios.get(`https://server-mern-project.vercel.app/animals/${id}`)
//             .then(res => {
//                 console.log(res.data);
//                 console.log(res.data.photos);
//                 setAnimal(res.data);
//                 setImages(res.data.photos.map(photo => ({src: photo, alt: animal.name})));
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }, [animal.name, id]);
//
//     return (
//         <div className="container-fluid" style={{display: 'flex', flexWrap: 'wrap'}}>
//             <div style={{flex: '1 1 100%', maxWidth: '95%', height: '100%'}}>
//                 <div style={{
//                     maxWidth: '95%',
//                     height: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     position: 'relative',
//                     flex: '1 1 100%'
//                 }}>
//                     <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={3} item={itemTemplate}
//                               thumbnail={thumbnailTemplate} circular={true}/>
//                 </div>
//             </div>
//             <div style={{
//                 maxWidth: '100%',
//                 height: '100%',
//                 flex: '1 1 auto',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 justifyContent: 'left'
//             }}>
//                 <h1 style={{margin: 10}}>{animal.name}</h1>
//                 <h4 style={{margin: 10}}>{animal.age}{' '}{animal.sex}</h4>
//                 <h4 style={{margin: 10}}>{animal.type}</h4>
//                 <p style={{margin: 10, textAlign: "left"}}>{animal.description}</p>
//                 <p style={{margin: 10, textAlign: "left"}}>{animal.paragraph}</p>
//             </div>
//         </div>
//     );
// };
// export default Animal;

import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import {Galleria} from 'primereact/galleria';

const Animal = () => {
    const {id} = useParams();
    const [animal, setAnimal] = useState({});

    const [images, setImages] = useState(null);
    const responsiveOptions = [{breakpoint: '991px', numVisible: 5}, {
        breakpoint: '767px',
        numVisible: 3
    }, {breakpoint: '575px', numVisible: 1}];

    const itemTemplate = (item) => {
        return <img src={item.src} alt={item.alt} style={{width: '100%'}}/>
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.src} alt={item.alt} style={{maxWidth: '100px', maxHeight: '100px'}}/>
    }


    useEffect(() => {
        axios.get(`https://server-mern-project.vercel.app/animals/${id}`)
            .then(res => {
                console.log(res.data);
                console.log(res.data.photos);
                setAnimal(res.data);
                setImages(res.data.photos.map(photo => ({src: photo, alt: animal.name})));
            })
            .catch(err => {
                console.log(err);
            });
    }, [animal.name, id]);

    return (
        <div className="container-fluid" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
        }}>
            <div style={{
                maxWidth: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    maxWidth: '75%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={3} item={itemTemplate}
                              thumbnail={thumbnailTemplate} circular={true}/>
                </div>
                <div style={{
                    maxWidth: '75%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'left'
                }}>
                    <h1 style={{margin: 10}}>{animal.name}</h1>
                    <h4 style={{margin: 10}}>{animal.age}{' '}{animal.sex}</h4>
                    <h4 style={{margin: 10}}>{animal.type}</h4>
                    <p style={{margin: 10, textAlign: "left"}}>{animal.description}</p>
                    <p style={{margin: 10, textAlign: "left"}}>{animal.paragraph}</p>
                </div>
            </div>
        </div>

    );
};
export default Animal;


// gallery cover text when moving

// import {useParams} from 'react-router-dom';
// import {useEffect, useState} from "react";
// import axios from "axios";
// import {Galleria} from 'primereact/galleria';
//
// const Animal = () => {
//     const {id} = useParams();
//     const [animal, setAnimal] = useState({});
//
//     const [images, setImages] = useState(null);
//     const responsiveOptions = [
//         {
//             breakpoint: '991px',
//             numVisible: 5
//         },
//         {
//             breakpoint: '767px',
//             numVisible: 3
//         },
//         {
//             breakpoint: '575px',
//             numVisible: 1
//         }
//     ];
//
//     const itemTemplate = (item) => {
//         return <img src={item.src} alt={item.alt} style={{width: '100%'}}/>
//     }
//
//     const thumbnailTemplate = (item) => {
//         return <img src={item.src} alt={item.alt} style={{maxWidth: '100px', maxHeight: '100px'}}/>
//     }
//
//     useEffect(() => {
//         axios.get(`https://server-mern-project.vercel.app/animals/${id}`)
//             .then(res => {
//                 console.log(res.data);
//                 console.log(res.data.photos);
//                 setAnimal(res.data);
//                 setImages(res.data.photos.map(photo => ({src: photo, alt: animal.name})));
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }, [animal.name, id]);
//
//     return (
//         <div className="container-fluid" style={{display: 'flex', marginTop: 10, flexDirection: 'row'}}>
//             <div style={{
//                 maxWidth: '50%',
//                 height: '100%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 position: 'relative'
//             }}>
//                 <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={3} item={itemTemplate}
//                           thumbnail={thumbnailTemplate} circular={true}/>
//             </div>
//             <div style={{
//                 maxWidth: '50%',
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 justifyContent: 'left'
//             }}>
//                 <h1 style={{margin: 10}}>{animal.name}</h1>
//                 <h4 style={{margin: 10}}>{animal.age}{' '}{animal.sex}</h4>
//                 <h4 style={{margin: 10}}>{animal.type}</h4>
//                 <p style={{margin: 10, textAlign: "left"}}>{animal.description}</p>
//                 <p style={{margin: 10, textAlign: "left"}}>{animal.paragraph}</p>
//             </div>
//             <style>
//                 {`
//                     @media (max-width: 575px) {
//                         .container-fluid {
//                             flex-direction: column;
//                         }
//                     }
//                 `}
//             </style>
//         </div>
//
//     );
// };
//
// export default Animal;

// initial  gallery not cover text when moving, but it stretched

// import {useParams} from 'react-router-dom';
// import {useEffect, useState} from "react";
// import axios from "axios";
// import {Galleria} from 'primereact/galleria';
//
// const Animal = () => {
//     const {id} = useParams();
//     const [animal, setAnimal] = useState({});
//
//     const [images, setImages] = useState(null);
//     const responsiveOptions = [
//         {
//             breakpoint: '991px',
//             numVisible: 5
//         },
//         {
//             breakpoint: '767px',
//             numVisible: 3
//         },
//         {
//             breakpoint: '575px',
//             numVisible: 1
//         }
//     ];
//
//     const itemTemplate = (item) => {
//         return <img src={item.src} alt={item.alt} style={{width: '100%'}}/>
//     }
//
//     const thumbnailTemplate = (item) => {
//         return <img src={item.src} alt={item.alt} style={{maxWidth: '100px', maxHeight: '100px'}}/>
//     }
//
//
//     useEffect(() => {
//         axios.get(`https://server-mern-project.vercel.app/animals/${id}`)
//             .then(res => {
//                 console.log(res.data);
//                 console.log(res.data.photos);
//                 setAnimal(res.data);
//                 setImages(res.data.photos.map(photo => ({src: photo, alt: animal.name})));
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }, [animal.name, id]);
//
//     return (
//         <div className="container-fluid" style={{display: 'flex', marginTop: 10}}>
//             <div style={{flex: 1}}>
//                 <div style={{
//                     maxWidth: '95%',
//                     height: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     position: 'relative'
//                 }}>
//                     <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={3} item={itemTemplate}
//                               thumbnail={thumbnailTemplate} circular={true}/>
//                 </div>
//             </div>
//             <div style={{
//                 maxWidth: '100%',
//                 height: '100%',
//                 flex: 1,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 justifyContent: 'left'
//             }}>
//                 <h1 style={{margin: 10}}>{animal.name}</h1>
//                 <h4 style={{margin: 10}}>{animal.age}{' '}{animal.sex}</h4>
//                 <h4 style={{margin: 10}}>{animal.type}</h4>
//                 <p style={{margin: 10, textAlign: "left"}}>{animal.description}</p>
//                 <p style={{margin: 10, textAlign: "left"}}>{animal.paragraph}</p>
//             </div>
//         </div>
//
//     );
// };
// export default Animal;

