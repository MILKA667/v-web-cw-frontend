import './style.css'

function SearchParams(){
    return(
        <div className='settings_container'>
            <p>Настройки поиска</p>
            <button>Сбросить все</button>
            <div className='radio_button_container'>
                <input type="radio" id="film" name="search_settings" />
                <label htmlFor="film">Фильм</label>
                <input type="radio" id="anime" name="search_settings" />
                <label htmlFor="anime">Аниме</label>
                <input type="radio" id="tvshow" name="search_settings" />
                <label htmlFor="tvshow">Сериал</label>
                <input type="radio" id="music" name="search_settings" />
                <label htmlFor="music">Музыка</label>
            </div>
        </div>
    )
}

export default SearchParams