import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import {Galleria} from 'primereact/galleria';

const Animal = () => {
    const {id} = useParams();
    const [animal, setAnimal] = useState({});

    const [images, setImages] = useState(null);
    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 5
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item) => {
        return <img src={item.src} alt={item.alt} style={{width: '100%'}}/>
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.src} alt={item.alt} style={{maxWidth: '100px', maxHeight: '100px'}}/>
    }


    useEffect(() => {
        axios.get(`http://localhost:5050/animals/${id}`)
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
        <div className="container-fluid" style={{display: 'flex', marginTop: 10}}>
            <div style={{flex: 1}}>
                <div style={{
                    maxWidth: '95%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={3} item={itemTemplate}
                              thumbnail={thumbnailTemplate} circular={true}/>
                </div>
            </div>
            <div style={{
                maxWidth: '100%',
                height: '100%',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'left'
            }}>
                <h1>{animal.name}</h1>
                <h3>{animal.type}</h3>
                <h3>{animal.age}{' '}{animal.sex}</h3>
                <p>{animal.description}</p>
            </div>
        </div>

    );
};
export default Animal;

