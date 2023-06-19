import "./searchbar.scss"
import React, { useState, useEffect } from "react";
import { fetchdata } from "../../utilis/data";
import { useParams } from "react-router-dom";
import Noresultimage from "../../assets/no-results.png"
import Spinner from "../../components/spinner/Spinner";
import Wrappercomponent from "../../components/wrapcomponent/Wrappercomponent";
import nodatafound from "../../assets/nodata.png"
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../components/card/Bootstrapcard"

const SearchBar = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const { query } = useParams()


    const fetchsearchquery = () => {
        setLoading(true)
        fetchdata(`/search/multi?query=${query}&page=${pageNumber}`).then((res) => {
            console.log("search result", res)
            setData(res)
            setPageNumber((prev) => prev + 1)
            setLoading(false)
        }).catch((error) => { console.log("error in fetching search query") })
    }

    const nextFetch = () => {
        setLoading(true)
        fetchdata(`/search/multi?query=${query}&page=${pageNumber}`).then((res) => {
            if (data?.results) {
                setData({ ...data, results: [...data?.results, ...res.results] })
                setLoading(false)
            }
            else {
                setData(res)
                setLoading(false)
            }
            setPageNumber((prev) => prev + 1)

        }).catch((error) => { onsole.log("error in nextfetching search query") })
    }

    useEffect(() => {
        setPageNumber(1);
        fetchsearchquery()
    }, [query])

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && <Wrappercomponent>
                {data?.results?.length > 0 ? (
                    <>
                        <div className="pageTitle">
                            {`Search ${data?.total_results > 1
                                ? "results" : "result"
                                } of '${query}'`}
                        </div>
                        <InfiniteScroll
                            dataLength={data?.results?.length || []}
                            next={nextFetch}
                            className="content"
                            hasMore={pageNumber <= data?.total_pages}
                            loader={<Spinner />}
                        >
                            <div className="row justify-content-center">

                                {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;

                                    return (
                                        <Card key={index} data={item} fromSearch={true}/>
                                    )
                                })}
                            </div>

                        </InfiniteScroll>
                    </>



                ) : (
                    <div className="resultNotFound">
                        <img
                            src={nodatafound}
                            alt="nodatafound "
                        />
                    </div>
                )}

            </Wrappercomponent>
            }
        </div>
    )
}

export default SearchBar
