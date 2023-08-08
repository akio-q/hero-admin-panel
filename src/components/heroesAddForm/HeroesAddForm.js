import { useSelector } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import store from "../../store";

import { selectAll } from "../heroesFilters/filtersSlice";
import { useCreateHeroMutation } from "../../api/apiSlice";

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

    const [createHero, {isLoading}] = useCreateHeroMutation();
 
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name,
            description,
            element
        };

        createHero(newHero).unwrap(); 

        setName('');
        setDescription('');
        setElement('');
    }

    const renderOptions = (filters, status) => {
        if (status === "loading") {
            return <option>Loading elements</option>
        } else if (status === "error") {
            return <option>Loading error</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, label}) => {
                if (name === 'all') return;

                return <option key={name} value={name}>{label}</option>
            });
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New character's name</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="What is my name?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="What can I do?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose hero's elemental power</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={e => setElement(e.target.value)}>
                    <option >My elemental power is...</option>
                    {renderOptions(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button 
                type="submit" 
                className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;