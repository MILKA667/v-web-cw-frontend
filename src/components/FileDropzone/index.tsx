import './style.css'
function FileDropzone(){
    return(
        <div className="drop_zone">
            <p>Перетащите сюда аудиофайл или изображение</p>
            <input
                type='file'
                id='file_upload'
                accept='.png'
                style={{display:'none'}}
            />
        </div>
    )
}

export default FileDropzone