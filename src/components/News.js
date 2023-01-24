import React, { Component } from 'react'
import NewsItem from './NewsItem'
export class News extends Component {        
    constructor(){
        super();    
        this.state = {
            articles : [],
            loading: true,
            page:1 , 
            totalResults: 0
        }
    }
    async componentDidMount(){ // It is a life cycle method|| jab render run ho jata hai phir componentDidMount run hota hai
        // console.log("componentDidMount");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ca58a9658db6407786c7e5fe0bd37dab&page=1&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles})
        // console.log(totalResults)
    }
    handlePreviousclick = async ()=>{
        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=ca58a9658db6407786c7e5fe0bd37dab&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page -1,
            articles:parsedData.articles
        })
    }
    handleNextclick = async ()=>{
        if(this.state.page+1 > Math.ceil(38/18)){

        }
        else{
            let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=ca58a9658db6407786c7e5fe0bd37dab&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page +1,
                articles:parsedData.articles
            })
        }
    }
  render() {
    console.log("Render")
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsToday- Top Headlines</h1>
        <div className="row">
            {this.state.articles.map((element)=>{
                return <div key={element.url} className="col-md-4 my-1">
                <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage?element.urlToImage:"https://www.pixelstalk.net/wp-content/uploads/images6/Waifu-Wallpaper-HD-Free-download.jpg"} newsUrl={element.url}/>
            </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}>&larr;Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(38/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
