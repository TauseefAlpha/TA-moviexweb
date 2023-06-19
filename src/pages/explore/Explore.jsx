
import React, {
  useEffect,
  useState
} from "react";
import useFetchdata from "../../customhook/useFetchdata";
import { fetchdata } from "../../utilis/data"
import Wrappercomponent from "../../components/wrapcomponent/Wrappercomponent";
import Select from "react-select"
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import Cardbootstrap from "../../components/card/Bootstrapcard"
import InfiniteScroll from "react-infinite-scroll-component";

import "./explore.scss"


let filters = {};

const Datasort = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];


const Explore = () => {
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null)
  const [data, setData] = useState(null);
  const [pageNummber, setPageNumber] = useState(1);
  const { mediatype } = useParams()
  console.log("media type", mediatype)

  const { data: genresData } = useFetchdata(`/genre/${mediatype}/list`);

  const fetchdataload = () => {
    setLoading(true)
    fetchdata(`/discover/${mediatype}`, filters).then((res) => {
      console.log("search result", res)
      setData(res)
      setPageNumber((prev) => prev + 1)
      setLoading(false)
    }).catch((error) => { console.log("error in fetching search query") })
  }

  

  const changepage = () => {

    fetchdata(`/discover/${mediatype}?page=${pageNummber}`, filters).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      }
      else {
        setData(res);
      }
      setPageNumber((p) => p + 1)
    }
    )
  }
  // =======///
  const handleChange = (selectedItems, action) => {

    console.log("genresData explore selectedItems", selectedItems)
    console.log("genresData explore selectedItems action", action)
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
        // console.log("filters.sort_by", filters.sort_by)
      } else {
        delete filters.sort_by;
      }
    }
    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        // console.log("genresData explore selectedItems genreId ", genreId)
        // console.log("genresData explore selectedItems genreId ", JSON.stringify(genreId).slice(1, -1))
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNumber(1);
    fetchdataload()

  }

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNumber(1);
    setSortby(null);
    setGenre(null);
    fetchdataload()
  }, [mediatype])

  return (

    <div className="explorePage">
      <Wrappercomponent >
        <div className="pageHeader">
          <div className="pageTitle">
            {mediatype === "tv" ? "Explore TV Shows" : "Explore Movies"} </div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={handleChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={Datasort}
              onChange={handleChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={changepage}
                hasMore={pageNummber <= data?.total_pages}
                loader={<Spinner />}
              >
                <div className=" row justify-content-center ">
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <Cardbootstrap
                      component="explore"
                      key={index}
                      data={item}
                      media_type={mediatype}
                    />
                  );
                })}
                </div>
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">
                Sorry, Results not found!
              </span>
            )}
          </>
        )}
      </Wrappercomponent >
    </div>
  )
}

export default Explore
