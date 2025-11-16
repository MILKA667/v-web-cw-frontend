import './style.css'
import FileDropzone from '../../components/FileDropzone'
import SearchParams from '../../components/SearchParams'
import Result from '../../components/Result'
function Home(){
    return(
        <div className="main_container">
            <div className="drop_zone_container"><FileDropzone /></div>
            <div className="settings_container"><SearchParams /></div>
            <div className="result_container"><Result /></div>
        </div>
    )
}
export default Home