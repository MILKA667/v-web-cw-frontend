import { useContext, useState } from "react";
import { FileContext } from "../../contexts/FileContext";
import './style.css'
import { ResultContext } from "../../contexts/ResultContext";
const URL = 'http:localhost:5000/api/'

export default function SearchParams() {
    const { file } = useContext(FileContext)!
    const { setResult } = useContext(ResultContext)!

    type FileType = 'film' | 'serial' | 'anime' | 'music';
    const [filetype, SetFileType] = useState<FileType>('film')

    async function upload_file() {
        if (!file) {
            alert("Вы не загрузили файл!");
            return;
        }
        switch (filetype) {
            case "anime":
                const formData = new FormData();
                formData.append("image", file);

                const response = await fetch("https://api.trace.moe/search", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();
                setResult({ name: data.result[0].filename, image: data.result[0].image, video: data.result[0].video })
                console.log(data);
                break
            default:
                break
        }

    }


    return (
        <div className='settings_container'>
            <p>Настройки поиска</p>
            <button onClick={upload_file}>Поиск</button>

            <div className='radio-group'>
                <label className='radio'>
                    <input type="radio" name="search_settings" onClick={() => SetFileType("film")} />
                    <span className='radio-custom'></span>
                    Фильм
                </label>

                <label className='radio'>
                    <input type="radio" name="search_settings" onClick={() => SetFileType("anime")} />
                    <span className='radio-custom'></span>
                    Аниме
                </label>

                <label className='radio'>
                    <input type="radio" name="search_settings" onClick={() => SetFileType("serial")} />
                    <span className='radio-custom'></span>
                    Сериал
                </label>

                <label className='radio'>
                    <input type="radio" name="search_settings" onClick={() => SetFileType("music")} />
                    <span className='radio-custom'></span>
                    Музыка
                </label>
            </div>
        </div>
    );
}
