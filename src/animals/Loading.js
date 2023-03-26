import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Loading = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAnimals = () => {
        axios.get(`https://server-mern-project.vercel.app/animals`)
            .then(res => {
                setAnimals(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAnimals();
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {!loading && animals.map(animal => (
                <div key={animal._id}>
                    <h2>{animal.name}</h2>
                    <p>{animal.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Loading;
