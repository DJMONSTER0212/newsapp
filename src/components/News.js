import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 18,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} -NewsToday`;
    }
    results = 0
    async componentDidMount() { // It is a life cycle method|| jab render run ho jata hai phir componentDidMount run hota hai
        this.props.setProgress(10);
        // console.log("componentDidMount");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData.totalResults);
        this.results = parsedData.totalResults
        // console.log(parsedData.totalResults);
        this.setState({ loading: false })
        this.setState({ totalResults: parsedData.totalResults })
        this.setState({ articles: parsedData.articles })
        this.props.setProgress(100);
        // console.log(totalResults)
    }
    handlePreviousclick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({ loading: false })
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }
    fetchMoreData = async () => {
        this.setState({page: this.state.page +1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData.totalResults);
        this.results = parsedData.totalResults
        // console.log(parsedData.totalResults);
        this.setState({ loading: false })
        this.setState({ totalResults: parsedData.totalResults })
        this.setState({ articles: this.state.articles.concat(parsedData.articles) })
      };
    handleNextclick = async () => {
        if (this.state.page + 1 > Math.ceil(this.totalResults / 18)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
            this.setState({ loading: true })
            let data = await fetch(url);
            this.setState({ loading: false })
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }
    render() {
        // console.log("Render")
        return (
            <>
                <h1 className='text-center'>NewsToday- Top Headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!== this.results}
                    loader={<Spinner/>}
                >
                    {this.state.loading && <Spinner />}
                    <div className="container"> 
                    <div className="row">
                        {this.state.articles.map((element) => {
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
}

export default News
