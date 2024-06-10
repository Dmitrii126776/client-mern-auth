import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {Galleria} from 'primereact/galleria';
import $api from "../http";

const Animal = () => {
    const {id} = useParams();
    const [animal, setAnimal] = useState({});

    const [images, setImages] = useState(null);
    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 3
        }
    ];

    const itemTemplate = (item) => {
        return <img src={item.src} alt={item.alt} style={{width: '100%'}}/>
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.src} alt={item.alt} style={{maxWidth: '50px', maxHeight: '50px'}}/>
    }


    useEffect(() => {
        $api.get(`/animals/${id}`)
            .then(res => {
                // console.log(res.data);
                // console.log(res.data.photos);
                setAnimal(res.data);
                setImages(res.data.photos.map(photo => ({src: photo, alt: animal.name})));
            })
            .catch(err => {
                console.log(err);
            });
    }, [animal.name, id]);

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', margin: 10}}>
            {/*<div style={{flex: 1}}>*/}
            <div className="card" style={{maxWidth: '600px'}}>
                <Galleria
                    value={images}
                    responsiveOptions={responsiveOptions}
                    numVisible={4}
                    item={itemTemplate}
                    thumbnail={thumbnailTemplate}
                    style={{maxWidth: '600px'}}
                    circular={true}
                />
            </div>
            {/*</div>*/}
            <div style={{flex: 1, marginLeft: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div className="d-flex align-items-center mb-3">
                        <h1 style={{margin: 10, display: 'block'}}>{animal.name}</h1>
                        <h2 style={{marginLeft: 50}}>{animal.type}</h2>
                    </div>
                    <div style={{marginLeft: 10, marginRight: 20}}>
                        <h4 style={{textAlign: "left"}}>{animal.age}{' '}{animal.sex}</h4>
                        <p style={{textAlign: "left"}}>{animal.description}</p>
                        <p style={{textAlign: "left"}}>{animal.paragraph}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Animal;
