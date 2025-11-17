import { useContext } from "react";
import { FileContext } from "../../contexts/FileContext";
import './style.css'
const URL = 'http:localhost:5000/api/'

export default function SearchParams() {
    const { file } = useContext(FileContext)!

    async function upload_file() {
        if (!file) {
            alert('Вы не загрузили файл!')
        } else {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(URL + 'upload_file', {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
        }

    }


    return (
        <div className='settings_container'>
            <p>Настройки поиска</p>
            <button onClick={upload_file}>Поиск</button>

            <div className='radio-group'>
                <label className='radio'>
                    <input type="radio" name="search_settings" />
                    <span className='radio-custom'></span>
                    Фильм
                </label>

                <label className='radio'>
                    <input type="radio" name="search_settings" />
                    <span className='radio-custom'></span>
                    Аниме
                </label>

                <label className='radio'>
                    <input type="radio" name="search_settings" />
                    <span className='radio-custom'></span>
                    Сериал
                </label>

                <label className='radio'>
                    <input type="radio" name="search_settings" />
                    <span className='radio-custom'></span>
                    Музыка
                </label>
            </div>
        </div>
    );
}
