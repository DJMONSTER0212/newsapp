import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {        
    static defaultProps = {
        country:'in',
        pageSize:18,
        category:"general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize:PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props){
        super(props);    
        this.state = {
            articles : [],
            loading: true,
            page:1 , 
            totalResults: 0
        }
        document.title = this.props.category;
    }
    async componentDidMount(){ // It is a life cycle method|| jab render run ho jata hai phir componentDidMount run hota hai
        // console.log("componentDidMount");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca58a9658db6407786c7e5fe0bd37dab&page=1&pagesize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData.totalResults);
        this.setState({loading:false})
        this.setState({totalResults:parsedData.totalResults})
        this.setState({articles:parsedData.articles})
        // console.log(totalResults)
    }
    handlePreviousclick = async ()=>{
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca58a9658db6407786c7e5fe0bd37dab&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({loading:false})
        this.setState({
            page: this.state.page -1,
            articles:parsedData.articles
        })
    }
    handleNextclick = async ()=>{
        if(this.state.page+1 > Math.ceil(this.totalResults/18)){

        }
        else{
            let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca58a9658db6407786c7e5fe0bd37dab&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            this.setState({loading:false})
            let parsedData = await data.json();
            // console.log(parsedData);
            this.setState({
                page: this.state.page +1,
                articles:parsedData.articles
            })
        }
    }
  render() {
    // console.log("Render")
    return (
        <div>
        <h1 className='text-center'>NewsToday- Top Headlines</h1>
        <div className='container my-3'>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading &&this.state.articles.map((element)=>{
                return <div key={element.url} className="col-md-4 my-1">
                <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage?element.urlToImage:"https://www.pixelstalk.net/wp-content/uploads/images6/Waifu-Wallpaper-HD-Free-download.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}>&larr;Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(38/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next&rarr;</button>
        </div>
      </div>
    </div>
    )
  }
}

export default News
