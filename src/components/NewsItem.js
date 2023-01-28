import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageurl, newsUrl, author, date,source } = this.props;
        return (
            <div className='my-3 '>
                <div className="card newsitem" >
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>
                            {source}
                        </span>
                        <h5 className="card-title">{title}... </h5>
                    <img src={imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
