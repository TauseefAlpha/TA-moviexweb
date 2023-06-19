import { useEffect } from "react"
import { fetchdata } from "./utilis/data"
import { useDispatch, useSelector } from "react-redux"
import { getConfigurationUrl, getGeners } from "./storeslices/homeslice"
import Home from "./pages/homePage/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./pages/notFound/NotFound"
import Details from "./pages/details/Details"
import SearchBar from "./pages/searchBar/SearchBar"
import Explore from "./pages/explore/Explore"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

let genras;


function App() {
  const { url } = useSelector((state) => state.home)


  const dispatch = useDispatch()

  const fetchmovieconfig = () => {
    fetchdata("/configuration").then((res) => {
      // console.log("data", res);

      const urltosave = {
        backedrop: res.images.secure_base_url + "original",
        posterpic: res.images.secure_base_url + "original",
        profilepic: res.images.secure_base_url + "original"

      }
      dispatch(getConfigurationUrl(urltosave))
    })


  }

  useEffect(() => {
    fetchmovieconfig()
    getGenersdata()
  }, [])

  const getGenersdata = async () => {
    let endPoints = ["movie", "tv"];
    const promsiedata = [];
    let genredataobject = {};


    endPoints.forEach((url) => {
      promsiedata.push(fetchdata(`/genre/${url}/list`))
    })

    const generdata = await Promise.all(promsiedata)

    generdata?.map(({ genres }) => (
      genres.map((val) => (genredataobject[val.id] = val))
    ))
    // console.log("genredataobject", genredataobject)
    dispatch(getGeners(genredataobject))

  }


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:media_type/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchBar />} />
        <Route path="/explore/:mediatype" element={<Explore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
