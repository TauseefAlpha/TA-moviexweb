
import Heropage from "./heropage/HeroPage.jsx"
import Popularshow from "./popularshows/Popularshow.jsx"
import Toprated from "./topratedshow/Toprated.jsx"
import Trending from "./trending/Trending.jsx"
const Home = () => {
    return (
        <div>
            <Heropage />
            <Trending />
            <Popularshow />
            <Toprated />
            {/* <div style={{ height: "1000px" }}></div> */}
        </div>
    )
}

export default Home
