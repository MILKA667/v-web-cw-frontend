import './style.css'
import { FileContext } from '../../contexts/FileContext'
import { useState, useEffect, useContext } from 'react'
import SearchParams from '../SearchParams'

function FileDropzone() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const { file, setFile, clearFile } = useContext(FileContext)!

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
            <div className='content'>
                <div
                    className={`drop_zone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('input_file')?.click()}
                >
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                        />
                    ) : (
                        <>
                            <img src='/upload_icon.svg' alt="Upload Icon" />
                            <p>Нажмите или перетащите для загрузки файла</p>
                        </>
                    )}

                    <input
                        type='file'
                        accept='.png'
                        id='input_file'
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                    />
                </div>
                <button onClick={()=>clearFile()}>Очистить</button>
            </div>


            <SearchParams />
        </div>
    )
}

export default FileDropzone
