import './style.css'
import { ResultContext } from '../../contexts/ResultContext'
import { useContext } from 'react'
function Result() {
    const { result } = useContext(ResultContext)!
    return (
        <div>
            <p>Результат</p>
            <div className='result_card'>
                {(result.name != "") ? (
                    <>
                        <p>{result.name}</p>
                        <video className='vid'>
                            <source src={result.video} type="video/mp4" />
                        </video>
                    </>
                ) : (
                    <p>Название</p>
                )}
                <p></p>
            </div>
        </div>
    )
}

export default Result