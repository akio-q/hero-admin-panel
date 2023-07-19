import { useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { addHero } from "../../actions";
import { v4 as uuidv4 } from 'uuid';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    let hero = {id: uuidv4()};

    const addNewHero = (e) => {
        e.preventDefault();

        dispatch(addHero(hero));
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(hero));

        hero = {id: uuidv4()};
    }

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New character's name</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    onChange={e => hero.name = e.target.value}
                    placeholder="What is my name?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    onChange={e => hero.description = e.target.value}
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
                    onChange={e => hero.element = e.target.value}>
                    <option >My elemental power is...</option>
                    <option 
                        value="fire">Fire</option>
                    <option 
                        value="water">Water</option>
                    <option 
                        value="wind">Wind</option>
                    <option 
                        value="earth">Earth</option>
                </select>
            </div>

            <button 
                type="submit" 
                className="btn btn-primary"
                onClick={addNewHero}>Create</button>
        </form>
    )
}

export default HeroesAddForm;