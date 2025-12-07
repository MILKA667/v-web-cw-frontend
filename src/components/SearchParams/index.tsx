import { useContext, useState } from "react";
import { FileContext } from "../../contexts/FileContext";
import './style.css'
import { ResultContext, type Result } from "../../contexts/ResultContext";
import FileTypeContext from "../../contexts/FileTypeContext";

export default function SearchParams() {
    const { file } = useContext(FileContext)!
    const { setResults } = useContext(ResultContext)!

    const { fileType, setFileType } = useContext(FileTypeContext)!
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");


    interface AuddResponse {
        result: {
            title: string;
            spotify?: {
                album?: {
                    images?: { url: string }[];
                };
                external_urls?: {
                    spotify: string;
                };
            };
        };
        status: string;
    }
    
    function mapAuddToResults(data: AuddResponse): Result[] {
        if (!data || data.status !== 'success' || !data.result) {
            return [];
        }
    
        const result: Result = {
            filename: data.result.title || "Неизвестный",
            image: data.result.spotify?.album?.images?.[0]?.url,
            video: undefined, // Для музыки видео нет
            similarity: undefined,
            episode: null,
            anilist: undefined,
            from: undefined,
            at: undefined,
            to: undefined,
            duration: undefined
        };
    
        return [result];
    }


    async function upload_file() {
        if (!file) {
            setError("Вы не загрузили файл!");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const formData = new FormData();
            let response: Response;
            let data: any;
            switch (fileType) {
                case "anime":
                    formData.append("image", file);
                    response = await fetch("https://api.trace.moe/search", {
                        method: "POST",
                        body: formData
                    });
        
                    if (!response.ok) {
                        throw new Error("Ошибка при поиске аниме");
                    }
        
                    data = await response.json();
                    console.log(data);
        
                    if (data.result?.length > 0) {
                        const results = data.result.map((item: any) => ({
                            filename: item.filename || "Неизвестный файл",
                            image: item.image,
                            video: item.video,
                            similarity: item.similarity,
                            episode: item.episode ?? null,
                            anilist: item.anilist,
                            from: item.from,
                            at: item.at,
                            to: item.to,
                            duration: item.duration
                        }));
                        setResults(results);
                    } else {
                        setError("Ничего не найдено");
                    }
                    break;
        
                case "film":
                case "serial":
                    case "music":
                        formData.append("music", file);
                        response = await fetch("http://localhost:5000/api/search_music", {
                            method: "POST",
                            body: formData
                        });
                    
                        if (!response.ok) {
                            throw new Error("Ошибка при поиске данных");
                        }
                    
                        data = await response.json();
                        console.log(data);
                    
                        const results = mapAuddToResults(data);
                        if (results.length > 0) {
                            setResults(results);
                        } else {
                            setError("Ничего не найдено");
                        }
                        break;
        
                default:
                    break;
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Произошла ошибка при поиске");
        } finally {
            setIsLoading(false);
        }
    }



    



    return (
        <div className='settings_container'>
            <div className="search_content">
                <p>Настройки поиска</p>
                {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
                <div className="button_group">
                    <button 
                        className={fileType === 'anime' ? 'ActiveButton' : 'noActiveButton'} 
                        onClick={() => setFileType("anime")}
                        disabled={isLoading}
                    >
                        <img src="/rei_ayanami.svg" alt="anime" />
                        <p>АНИМЕ</p>
                    </button>
                    <button 
                        className={fileType === 'music' ? 'ActiveButton' : 'noActiveButton'} 
                        onClick={() => setFileType("music")}
                        disabled={isLoading}
                    >
                        <img src="/nirvana.png" alt="music" />
                        <p>МУЗЫКА</p>
                    </button>
                    <button 
                        className={fileType === 'film' ? 'ActiveButton' : 'noActiveButton'} 
                        onClick={() => setFileType("film")}
                        disabled={isLoading}
                    >
                        <img src="/iron_man.png" alt="film" />
                        <p>ФИЛЬМ</p>
                    </button>
                    <button 
                        className={fileType === 'serial' ? 'ActiveButton' : 'noActiveButton'} 
                        onClick={() => setFileType("serial")}
                        disabled={isLoading}
                    >
                        <img src="/walter_weiht.png" alt="serial" />
                        <p>СЕРИАЛ</p>
                    </button>
                </div>
            </div>
            <button 
                className="start_button" 
                onClick={upload_file}
                disabled={isLoading}
            >
                {isLoading ? "Поиск..." : "Поиск!"}
            </button>
        </div>
    );
}


