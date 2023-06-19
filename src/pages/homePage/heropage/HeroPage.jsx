
import { useState, useEffect } from "react"
import "./heropage.scss"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import useFetchdata from "../../../customhook/useFetchdata"
import Img from "../../../components/lazyloadimage/Img"
import Wrappercomponent from "../../../components/wrapcomponent/Wrappercomponent"


const Heropage = () => {
    // "movie / upcoming"
    const urlendpoint = "/movie/upcoming"
    const [background, setBackgroundimage] = useState("");
    const { data, loading, error } = useFetchdata(urlendpoint)
    const [query, setQuery] = useState("");

    const { url } = useSelector((state) => state.home)

    const navigate = useNavigate();


    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    }

    const handlesearch = (event) => {
        if (query.length > 0) {
            navigate(`/search/${query}`);
        }
    }

    useEffect(() => {
        //geting url.backdrop from redux store and containate
        const image = url.backedrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
        setBackgroundimage(image)
    }, [data])



    return (
        <div className="heropage">

            {!loading && <div className="bgdropimg">
                <Img src={background} />
            </div>}
            {/*hoc  {Wrappercomponent} */}
            <div className="opacitylayer"></div>
            <Wrappercomponent>
                <div className="wrappercontent">
                    <span className="title">Welcome</span>
                    <span className="subtitle">Million of Movies and Tvshows people to discover</span>
                    <div className="searchinput">
                        <input placeholder="search for movies"
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                            className="inputclass"
                            onKeyUp={searchQueryHandler} />
                        <button className="btnsearch" onClick={handlesearch}>Search</button>
                    </div>
                </div>
            </Wrappercomponent>
        </div>
    )
}

export default Heropage
