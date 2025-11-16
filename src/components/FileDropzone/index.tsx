import './style.css'
import { FileContext } from '../../contexts/FileContext'
import { useState, useEffect, useContext } from 'react'

function FileDropzone() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const { file, setFile } = useContext(FileContext)!

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0])
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null)
            return
        }

        const url = URL.createObjectURL(file)
        setPreviewUrl(url)

        return () => URL.revokeObjectURL(url)
    }, [file])

    return (
        <div className="drop_zone_container">
            <div
                className={`drop_zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('input_file')?.click()}
            >
                <img src='/upload_icon.svg' />
                <p>Нажмите или перетащите для загрузки файла</p>
                <input
                    type='file'
                    accept='.png'
                    id='input_file'
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                />
            </div>

            {!file && (
                <div className='watch_file'>
                    <img src="/play_icon.svg" alt="play" />
                </div>
            )}

            {previewUrl && (
                <div className='watch_file'>
                    <img src={previewUrl} alt="preview" />
                </div>
            )}
        </div>
    )
}

export default FileDropzone
