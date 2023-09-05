import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {Typography} from '@mui/material';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Loader from "../components/Loader";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';


const AnimalsBoard = (props) => {
    const {animals, getAnimalById, loading} = props;

    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [valueAnimal, setValueAnimal] = useState('all');
    const [valueGender, setValueGender] = useState('all');
    const [valueAge, setValueAge] = useState('');

    const allSortAge = sortByAge(animals)

    const allFemale = animals.filter(el => el.sex === 'Female')
    const allFemaleSortAge = sortByAge(allFemale)

    const allMale = animals.filter(el => el.sex === 'Male')
    const allMaleSortAge = sortByAge(allMale)

    const turtle = animals.filter((el) => el.type === 'Turtle');
    const allTurtleSortAge = sortByAge(turtle)

    const turtleFemale = turtle.filter(el => el.sex === 'Female')
    const allFemaleTurtleSortAge = sortByAge(turtleFemale)

    const turtleMale = turtle.filter(el => el.sex === 'Male')
    const allMaleTurtleSortAge = sortByAge(turtleMale)

    const nudibranch = animals.filter((el) => el.type === 'Nudibranch');
    const allNudibranchSortAge = sortByAge(nudibranch)

    const nudibranchFemale = nudibranch.filter(el => el.sex === 'Female')
    const allFemailNudibranchSortAge = sortByAge(nudibranchFemale)

    const nudibranchMale = nudibranch.filter(el => el.sex === 'Male')
    const allMaleNudibranchMale = sortByAge(nudibranchMale)

    const other = animals.filter((el) => el.type === 'Other');
    const otherSortAge = sortByAge(other)

    const otherFemale = other.filter(el => el.sex === 'Female')
    const otherFemaleSortAge = sortByAge(otherFemale)

    const otherMale = other.filter(el => el.sex === 'Male')
    const otherMaleSortAge = sortByAge(otherMale)

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
    if (valueAnimal === 'all' && valueGender === 'all' && valueAge === '') displayedAnimals = animals;
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

    if (selectedAnimal) {
        displayedAnimals = displayedAnimals.filter((animal) => animal.name === selectedAnimal.name);
    }
    //console.log(displayedAnimals)


    const moveToAnimal = (id) => {
        getAnimalById(id)
        window.open(`/animals/animal/${id}`, "_blank");
    };

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.name,
    });

    const noOptionsText = (
        <Typography sx={{color: 'red'}}>Animal with this name not found</Typography>
    );

    const uniqueSortedArray = [...new Set(animals.map((option) => option.name))]
        .sort((a, b) => a.localeCompare(b))
        .map((name) => animals.find((option) => option.name === name));

    const resetFilter = () => {
        setValueAnimal('all')
        setValueGender('all')
        setValueAge('')
        setSelectedAnimal(null);
    }

    return (
        <div className="container-fluid">
            <div>
                <h1>Find Your Animal</h1>
                <hr/>
            </div>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div style={{marginLeft: 20}}>
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
            </div>
            <hr/>
            <div style={{margin: 20}} className="container-fluid d-flex justify-content-between align-items-center">
                <div>
                    <Autocomplete
                        id="filter-demo"
                        options={uniqueSortedArray}
                        getOptionLabel={(option) => option.name}
                        filterOptions={filterOptions}
                        sx={{width: 250}}
                        renderInput={(params) => <TextField {...params} label="Find Animal by name"/>}
                        noOptionsText={noOptionsText}
                        value={selectedAnimal}
                        onChange={(event, value) => setSelectedAnimal(value)}
                    />
                </div>
                <div style={{marginRight: 30}}>
                    <Button onClick={resetFilter} variant="outlined">Reset Filter</Button>
                </div>
            </div>

            <div>
                {loading ? (
                    <div>
                        <Loader/>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div>
                        {displayedAnimals.length === 0 ? (
                            <h4 style={{color: 'red', marginTop: 50}}>Animals are not found, please change your search
                                criteria.</h4>
                        ) : (
                            <div className="row">
                                {displayedAnimals.map((el, index) => (
                                    <div key={el._id} className="col-md-3 col-auto mb-2">
                                        <div className="card p-0" style={{
                                            width: '100%',
                                            cursor: 'pointer',
                                            //boxShadow: '-1px -1px 2px #888888',
                                            boxShadow: '2px 4px 4px #888888',
                                            marginBottom: '5px',
                                        }}
                                             onClick={() => moveToAnimal(el._id)}>
                                            <LazyLoadImage
                                                src={el.photos[0]}
                                                effect="blur"
                                                loading="lazy"
                                                className="card-img-top"
                                                alt="Loading ..."
                                                placeholderSrc={el.photos[0]}
                                            />
                                            {/*<img src={el.photos[0]} loading="lazy" className="card-img-top" alt="Loading ..."/>*/}
                                            {/*{el.photos[0] ? (*/}
                                            {/*    <img*/}
                                            {/*        src={el.photos[0]}*/}
                                            {/*        className="card-img-top"*/}
                                            {/*        alt="..."*/}
                                            {/*    />*/}
                                            {/*) : (*/}
                                            {/*    <div>*/}
                                            {/*        <Loader/>*/}
                                            {/*        <p>Loading Image...</p>*/}
                                            {/*    </div>*/}
                                            {/*)}*/}
                                            <div className="card-body">
                                                <h5 className="card-title">{el.name}</h5>
                                                <h6 className="card-text">{el.type}</h6>
                                                <h6 className="card-text">{el.age}, {el.sex}</h6>
                                            </div>
                                        </div>
                                        {(index + 1) % 4 === 0 && <div className="w-100"></div>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimalsBoard;
