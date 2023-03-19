import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const AnimalsBoard = (props) => {
    const {animals, getAnimalById} = props;
    const all = animals.reverse();
    const allSortAge = sortByAge(all)

    const allFemale = all.filter(el => el.sex === 'Female')
    const allFemaleSortAge = sortByAge(allFemale)

    const allMale = all.filter(el => el.sex === 'Male')
    const allMaleSortAge = sortByAge(allMale)

    const turtle = animals.filter((el) => el.type === 'Turtle').reverse();
    const allTurtleSortAge = sortByAge(turtle)

    const turtleFemale = turtle.filter(el => el.sex === 'Female')
    const allFemaleTurtleSortAge = sortByAge(turtleFemale)

    const turtleMale = turtle.filter(el => el.sex === 'Male')
    const allMaleTurtleSortAge = sortByAge(turtleMale)

    const nudibranch = animals.filter((el) => el.type === 'Nudibranch').reverse();
    const allNudibranchSortAge = sortByAge(nudibranch)

    const nudibranchFemale = nudibranch.filter(el => el.sex === 'Female')
    const allFemailNudibranchSortAge = sortByAge(nudibranchFemale)

    const nudibranchMale = nudibranch.filter(el => el.sex === 'Male')
    const allMaleNudibranchMale = sortByAge(nudibranchMale)

    const other = animals.filter((el) => el.type === 'Other').reverse();
    const otherSortAge = sortByAge(other)

    const otherFemale = other.filter(el => el.sex === 'Female')
    const otherFemaleSortAge = sortByAge(otherFemale)

    const otherMale = other.filter(el => el.sex === 'Male')
    const otherMaleSortAge = sortByAge(otherMale)

    const [valueAnimal, setValueAnimal] = useState('all');
    const [valueGender, setValueGender] = useState('all');
    const [valueAge, setValueAge] = useState('');

    function sortByAge(arr) {
        const sortedArr = [...arr]; // Create a copy of the original array
        return sortedArr.sort(function (a, b) {
            const ageA = getAgeInMonths(a.age);
            const ageB = getAgeInMonths(b.age);
            return ageA - ageB;
        });
    }

    function getAgeInMonths(age) {
        const ageArr = age.split(" ");
        if (ageArr[1].toLowerCase() === "year" || ageArr[1].toLowerCase() === "years") {
            return ageArr[0] * 12;
        } else if (ageArr[1].toLowerCase() === "month" || ageArr[1].toLowerCase() === "months") {
            return parseInt(ageArr[0]);
        }
    }

    const handleChangeAnimal = (event) => {
        setValueAnimal(event.target.value);
    };
    const handleChangeGender = (event) => {
        setValueGender(event.target.value);
    };
    const handleChangeAge = (event) => {
        setValueAge(event.target.value);
    };

    let displayedAnimals;
    if (valueAnimal === 'all' && valueGender === 'all' && valueAge === '') displayedAnimals = all;
    if (valueAnimal === 'all' && valueGender === 'all' && valueAge === 'sort') displayedAnimals = allSortAge;

    if (valueAnimal === 'all' && valueGender === 'female' && valueAge === '') displayedAnimals = allFemale;
    if (valueAnimal === 'all' && valueGender === 'female' && valueAge === 'sort') displayedAnimals = allFemaleSortAge;

    if (valueAnimal === 'all' && valueGender === 'male' && valueAge === '') displayedAnimals = allMale;
    if (valueAnimal === 'all' && valueGender === 'male' && valueAge === 'sort') displayedAnimals = allMaleSortAge;

    if (valueAnimal === 'turtle' && valueGender === 'all' && valueAge === '') displayedAnimals = turtle;
    if (valueAnimal === 'turtle' && valueGender === 'all' && valueAge === 'sort') displayedAnimals = allTurtleSortAge;

    if (valueAnimal === 'turtle' && valueGender === 'female' && valueAge === '') displayedAnimals = turtleFemale;
    if (valueAnimal === 'turtle' && valueGender === 'female' && valueAge === 'sort') displayedAnimals = allFemaleTurtleSortAge;

    if (valueAnimal === 'turtle' && valueGender === 'male' && valueAge === '') displayedAnimals = turtleMale;
    if (valueAnimal === 'turtle' && valueGender === 'male' && valueAge === 'sort') displayedAnimals = allMaleTurtleSortAge;

    if (valueAnimal === 'nudibranch' && valueGender === 'all' && valueAge === '') displayedAnimals = nudibranch;
    if (valueAnimal === 'nudibranch' && valueGender === 'all' && valueAge === 'sort') displayedAnimals = allNudibranchSortAge;

    if (valueAnimal === 'nudibranch' && valueGender === 'female' && valueAge === '') displayedAnimals = nudibranchFemale;
    if (valueAnimal === 'nudibranch' && valueGender === 'female' && valueAge === 'sort') displayedAnimals = allFemailNudibranchSortAge;

    if (valueAnimal === 'nudibranch' && valueGender === 'male' && valueAge === '') displayedAnimals = nudibranchMale;
    if (valueAnimal === 'nudibranch' && valueGender === 'male' && valueAge === 'sort') displayedAnimals = allMaleNudibranchMale;

    if (valueAnimal === 'other' && valueGender === 'all' && valueAge === '') displayedAnimals = other;
    if (valueAnimal === 'other' && valueGender === 'all' && valueAge === 'sort') displayedAnimals = otherSortAge;

    if (valueAnimal === 'other' && valueGender === 'female' && valueAge === '') displayedAnimals = otherFemale;
    if (valueAnimal === 'other' && valueGender === 'female' && valueAge === 'sort') displayedAnimals = otherFemaleSortAge;

    if (valueAnimal === 'other' && valueGender === 'male' && valueAge === '') displayedAnimals = otherMale;
    if (valueAnimal === 'other' && valueGender === 'male' && valueAge === 'sort') displayedAnimals = otherMaleSortAge;

    console.log(displayedAnimals)
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

    const resetFilter = () => {
        setValueAnimal('all')
        setValueGender('all')
        setValueAge('')
    }

    return (
        <div className="container-fluid">
            <div>
                <h1>Find Your Animal</h1>
            </div>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div>
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
                <div>
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
                <div>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Age</FormLabel>
                        <RadioGroup
                            value={valueAge} onChange={handleChangeAge}
                            row aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="sort" control={<Radio/>} label="Sort"/>

                        </RadioGroup>
                    </FormControl>
                </div>
                <Button onClick={resetFilter} variant="outlined">Reset Filter</Button>

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
