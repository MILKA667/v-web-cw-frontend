import { useState, useEffect } from "react";
import './style.css';

export default function Like() {
    type FileType = 'film' | 'serial' | 'anime' | 'music';

    const [filetype, setFileType] = useState<FileType>('anime');
    const [fav_anime, setFavAnime] = useState<any[]>([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function load() {
            const res = await fetch("http://localhost:5000/api/get_likes", {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                method: "GET"
            });

            const data = await res.json();
            console.log(data)
            setFavAnime(data.likes);
        }
        load();
    }, []);

    return (
        <div className="like_page">

            <div className="params">
                <button
                    className={filetype === 'anime' ? 'ActiveButton' : 'noActiveButton'}
                    onClick={() => setFileType("anime")}
                ><p>Аниме</p></button>

                <button
                    className={filetype === 'film' ? 'ActiveButton' : 'noActiveButton'}
                    onClick={() => setFileType("film")}
                ><p>Фильм</p></button>

                <button
                    className={filetype === 'serial' ? 'ActiveButton' : 'noActiveButton'}
                    onClick={() => setFileType("serial")}
                ><p>Сериал</p></button>

                <button
                    className={filetype === 'music' ? 'ActiveButton' : 'noActiveButton'}
                    onClick={() => setFileType("music")}
                ><p>Музыка</p></button>
            </div>

            <div className="like_container">
                {filetype === "anime" && (
                    <div className="anime_list">
                        {fav_anime.length === 0 ? (
                            <p>У вас нет лайкнутых аниме</p>
                        ) : (
                            fav_anime.map((item, index) => (
                                <div key={index} className="anime_card">
                                    <img src={item.anime_image} alt={item.anime_title} />
                                    <p>{item.anime_title}</p>
                                </div>
                            ))

                        )}
                    </div>
                )}

                {filetype === "film" && <div>Фильмы избранное</div>}
                {filetype === "serial" && <div>Сериалы избранное</div>}
                {filetype === "music" && <div>Музыка избранное</div>}
            </div>

        </div>
    );
}
