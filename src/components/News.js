import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 9,

  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      initialLoading: false,
      pageNo: 1,
      totalResults: 0
    }
  }
  async componentDidMount() {
    this.props.updateProgress(35);
    this.setState({ initialLoading: true });
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`);
    this.props.updateProgress(70);
    let parsedResponse = await response.json();
    this.props.updateProgress(90);
    if (parsedResponse.status === "ok") {
      this.setState({ articles: parsedResponse.articles, initialLoading: false, totalResults: parsedResponse.totalResults });
    } else {
      this.setState({ loading: false });
    }
    this.props.updateProgress(100);
  }

  fetchData = async () => {
    // this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.pageNo + 1}`;
    console.log(url);
    let response = await fetch(url);
    let parsedResponse = await response.json();
    if (parsedResponse.status === "ok") {
      this.setState({ articles: this.state.articles.concat(parsedResponse.articles), pageNo: this.state.pageNo + 1 });
    } else {
      // this.setState({ loading: false });
    }
  }
  render() {
    return (
      <>
        <h1 className="text-center text-capitalize my-2">{this.props.category} - Top Headlines</h1>
        {this.state.initialLoading && <Loader />}
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                let { title, description, urlToImage, url, author, publishedAt, source } = element;
                return <div className="col-md-4 my-1" key={url}>
                  <NewsItem title={title
                  } desc={description}
                    imgUrl={urlToImage} srcUrl={url} author={author} publishedAt={publishedAt} src={source.name}/>
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
