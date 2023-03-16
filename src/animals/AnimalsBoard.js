import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const AnimalsBoard = (props) => {
    const {animals, getAnimalById} = props;
    console.log(animals)
    const all = animals.reverse();
    console.log(all)
    const allFemale = all.filter(el => el.sex === 'Female')
    const allMale = all.filter(el => el.sex === 'Male')
    const turtle = animals.filter((el) => el.type === 'Turtle').reverse();
    const turtleFemale = turtle.filter(el => el.sex === 'Female')
    const turtleMale = turtle.filter(el => el.sex === 'Male')
    const nudibranch = animals.filter((el) => el.type === 'Nudibranch').reverse();
    const nudibranchFemale = nudibranch.filter(el => el.sex === 'Female')
    const nudibranchMale = nudibranch.filter(el => el.sex === 'Male')
    const other = animals.filter((el) => el.type === 'Other').reverse();
    const otherFemale = other.filter(el => el.sex === 'Female')
    const otherMale = other.filter(el => el.sex === 'Male')

    const [valueAnimal, setValueAnimal] = useState('all');
    const [valueGender, setValueGender] = useState('all');

    const handleChangeAnimal = (event) => {
        setValueAnimal(event.target.value);
    };
    const handleChangeGender = (event) => {
        setValueGender(event.target.value);
    };

    let displayedAnimals;
    if (valueAnimal === 'all' && valueGender === 'all') displayedAnimals = all;
    if (valueAnimal === 'all' && valueGender === 'female') displayedAnimals = allFemale;
    if (valueAnimal === 'all' && valueGender === 'male') displayedAnimals = allMale;
    if (valueAnimal === 'turtle' && valueGender === 'all') displayedAnimals = turtle;
    if (valueAnimal === 'turtle' && valueGender === 'female') displayedAnimals = turtleFemale;
    if (valueAnimal === 'turtle' && valueGender === 'male') displayedAnimals = turtleMale;
    if (valueAnimal === 'nudibranch' && valueGender === 'all') displayedAnimals = nudibranch;
    if (valueAnimal === 'nudibranch' && valueGender === 'female') displayedAnimals = nudibranchFemale;
    if (valueAnimal === 'nudibranch' && valueGender === 'male') displayedAnimals = nudibranchMale;
    if (valueAnimal === 'other' && valueGender === 'all') displayedAnimals = other;
    if (valueAnimal === 'other' && valueGender === 'female') displayedAnimals = otherFemale;
    if (valueAnimal === 'other' && valueGender === 'male') displayedAnimals = otherMale;


    // const navigate = useNavigate();
    // const moveToAnimal = (id) => {
    //     getAnimalById(id)
    //     console.log(id)
    //     navigate(`/animals/animal/${id}`)
    // }

    const moveToAnimal = (id) => {
        getAnimalById(id)
        window.open(`/animals/animal/${id}`, "_blank");
    };

    return (
        <div className="container-fluid">
            <div>
                <h1>Find Your Animal</h1>
            </div>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div style={{marginLeft: 75}}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Animals</FormLabel>
                        <RadioGroup
                            value={valueAnimal} onChange={handleChangeAnimal}
                            row aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="all" control={<Radio/>} label="All"/>
                            <FormControlLabel value="turtle" control={<Radio/>} label="Turtle"/>
                            <FormControlLabel value="nudibranch" control={<Radio/>} label="Nudibranch"/>
                            <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div style={{marginRight: 75}}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            value={valueGender} onChange={handleChangeGender}
                            row aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="all" control={<Radio/>} label="All"/>
                            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                            <FormControlLabel value="male" control={<Radio/>} label="Male"/>

                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="row">
                {displayedAnimals.map((el, index) => (
                    <div key={el._id} className="col-md-3 col-auto mb-2">
                        <div className="card p-0" style={{width: '100%', cursor: 'pointer'}}
                             onClick={() => moveToAnimal(el._id)}>
                            <img src={el.photos[0]} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{el.name}</h5>
                                <h6 className="card-text">{el.type}</h6>
                                <h6 className="card-text">{el.age}, {el.sex} </h6>
                            </div>
                        </div>
                        {(index + 1) % 4 === 0 && <div className="w-100"></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimalsBoard;
