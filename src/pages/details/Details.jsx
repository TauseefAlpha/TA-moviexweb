

import "./detail.scss"
import { fetchdata } from "../../utilis/data"
import { useState } from "react"
import useFetchdata from "../../customhook/useFetchdata"
import Detailbanner from "./detailbanner/Detailbanner"
import { useParams } from "react-router-dom"
import MovieCast from "./moviescastmember/MovieCast"
import Videosection from "./videoscomponent/Videosection"
import Similar from "./recomendationsimilar/Similar"
import Recomendation from "./recomendationsimilar/Recomendation"
const Details = () => {
  const [detailpg, setDetailpg] = useState();
  const { media_type, id } = useParams()
  const { data, loading, error } = useFetchdata(`/${media_type}/${id}/videos`)
  console.log("data of videos ", data)

  //to get cast of movies/tv series
  const { data: castcredit, loading: castcreditloading } = useFetchdata(`/${media_type}/${id}/credits`)


  return (
    <div>
      <Detailbanner videodata={data?.results?.[0]} castmember={castcredit?.crew} />
      <MovieCast data={castcredit?.cast} loading={castcreditloading} />
      {/* //passing data from video api call  */}
      <Videosection data={data} loading={loading} />
      <Similar media_type={media_type} id={id} />
      <Recomendation media_type={media_type} id={id} />
    </div>
  )
}

export default Details
