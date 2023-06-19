
import Wrappercomponent from "../wrapcomponent/Wrappercomponent"
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc"
import movixlogo from "../../assets/movix-logo.svg"
import logo from "../../assets/clogo.png"
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"


import "./headerstyle.scss"
const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobiledisplay, setMobiledisplay] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();



    const navbarcontrol = () => {
        if (window.scrollY > 205) {
            if (window.scrollY > lastScrollY && !mobiledisplay) {
                setShow("hide");
            } else {
                setShow("show");
            }
        }
        else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        window.addEventListener("scroll", navbarcontrol)

        return () => window.removeEventListener("scroll", navbarcontrol)

    }, [lastScrollY])

    const togglesearch = () => {
        setShowSearch(true)
        setMobiledisplay(false)
    }
    const togglemobledisplay = () => {
        setMobiledisplay(true)
        setShowSearch(false)
    }

    const searchQueryHandler = () => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false)
            }, 1000)
        }

    }
    const navigateHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobiledisplay(false);
    };

    return (
        <header className={`header ${mobiledisplay ? "mobileView" : ""} ${show}`}>

            <div className="contentWrapper">
                <div className="logoimg" onClick={() => navigate("/")}>
                    <img src={logo} width={"90px"} height={"90px"} />
                </div>

                <ul className="navlist">
                    <li className="listitem" onClick={() => navigateHandler("movie")}> Movies</li>
                    <li className="listitem" onClick={() => navigateHandler("Tv")}>Tv series</li>
                    <li className="listitem"><HiOutlineSearch className="searchIcon" onClick={togglesearch} /></li>
                </ul>
                <div className="mobilemenu">
                    <HiOutlineSearch onClick={togglesearch} />
                    {mobiledisplay ? <VscChromeClose onClick={() => setMobiledisplay(false)} /> :
                        <SlMenu onClick={togglemobledisplay} />
                    }



                </div>
            </div>
            {showSearch && <div className="searchBar">
                <div className="contentWrapper">
                    <div className="searchInput">
                        <input placeholder="search for movies"
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                            className="inputclass"
                            onKeyUp={searchQueryHandler} />
                        <VscChromeClose onClick={() => setShowSearch(false)} />
                    </div>
                </div>
            </div>}
        </header>
    )
}

export default Header
