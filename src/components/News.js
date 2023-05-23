import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
const News = (props)=>{
    const [articles,setArticles]= useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalresults,setTotalResults]=useState(0)
    // document.title = `${this.capitalizeFirstLetter(props.category)} -NewsToday`;
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews = async ()=>{
        props.setProgress(10);
        // console.log("componentDidMount");
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pagesize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        console.log(parsedData.totalResults);
        results = parsedData.totalResults
        // console.log(parsedData.totalResults);
        setLoading(false)
        setTotalResults(parsedData.totalResults)
        setArticles(parsedData.articles)
        props.setProgress(100);
    }
    let results = 0
    useEffect( ()=>{
        updateNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // async componentDidMount() { // It is a life cycle method|| jab render run ho jata hai phir componentDidMount run hota hai
    //     props.setProgress(10);
    //     // console.log("componentDidMount");
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pagesize=${props.pageSize}`;
    //     this.setState({ loading: true })
    //     let data = await fetch(url);
    //     props.setProgress(30);
    //     let parsedData = await data.json();
    //     props.setProgress(70);
    //     console.log(parsedData.totalResults);
    //     this.results = parsedData.totalResults
    //     // console.log(parsedData.totalResults);
    //     setLoading(false)
    //     setTotalResults(parsedData.totalResults)
    //     setArticles(parsedData.articles)
    //     props.setProgress(100);
    //     // console.log(totalResults)
    // }

    const fetchMoreData = async () => {
        setPage(page +1);
        // console.log(page);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
        if(page===1){
            url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=2&pagesize=${props.pageSize}`;
            setPage(3);
        }
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData.totalResults);
        results = parsedData.totalResults
        // console.log(parsedData.totalResults);
        setLoading( false)
        setTotalResults(parsedData.totalResults)
        setArticles(articles.concat(parsedData.articles))
      };
   
        // console.log("Render")
        return (
            <>
                <h1 className='text-center'>NewsToday- Top Headlines</h1>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!==results}
                    loader={<Spinner/>}
                >
                    {loading && <Spinner />}
                    <div className="container"> 
                    <div className="row">
                        {articles.map((element) => {
                            return <div key={element.url} className="col-md-4 my-1">
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage ? element.urlToImage : "https://www.pixelstalk.net/wp-content/uploads/images6/Waifu-Wallpaper-HD-Free-download.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
            </>
        )
}
News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
