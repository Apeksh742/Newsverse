import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NewsItem extends Component {
  
  render() {
    let { title, desc, imgUrl, srcUrl, author, publishedAt } = this.props;
    return (
      <div className="card">
        <div className="d-flex" style={{position:"absolute",right:"0px"}}>
          <span className="badge rounded-pill bg-danger">{this.props.src}</span>
        </div>
        <img src={imgUrl ? imgUrl :"https://img.freepik.com/free-vector/top-headlines-news-themem-background_1017-14199.jpg?w=300"}
         className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
          <p className="card-text"><small className="text-muted">By {author?author:"Anonymous"} at {new Date(publishedAt).toUTCString()}</small></p>
          <a href={srcUrl} target='_blank' rel="noreferrer" className="btn btn-dark">Read More</a>
        </div>
      </div>
    )
  }
}

export default NewsItem
