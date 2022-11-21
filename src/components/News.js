import NewsItem from './NewsItem'
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState, useEffect } from 'react'

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const fetchData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${pageNo + 1}`;
    console.log(url);
    let response = await fetch(url);
    let parsedResponse = await response.json();
    if (parsedResponse.status === "ok") {
      setArticles(articles.concat(parsedResponse.articles));
      setTotalResults(parsedResponse.totalResults);
      setPageNo(pageNo+1);
    } else {
      // this.setState({ loading: false });
    }
  }
  const fetchInitialData = async () => {
    props.updateProgress(35);
    setInitialLoading(true);
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`);
    props.updateProgress(70);
    let parsedResponse = await response.json();
    props.updateProgress(90);
    if (parsedResponse.status === "ok") {
      setArticles(parsedResponse.articles);
      setTotalResults(parsedResponse.totalResults);
      setInitialLoading(false);
      props.updateProgress(100);
    } else {
      this.setState({ loading: false });
    }
  }
  useEffect(() => {
    fetchInitialData();
  }, [])
  return (
    <>
      <h1 className="text-center text-capitalize my-2">{props.category} - Top Headlines</h1>
      {initialLoading && <Loader />}
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length !== totalResults}
        loader={<Loader />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              let { title, description, urlToImage, url, author, publishedAt, source } = element;
              return <div className="col-md-4 my-1" key={url}>
                <NewsItem title={title
                } desc={description}
                  imgUrl={urlToImage} srcUrl={url} author={author} publishedAt={publishedAt} src={source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>

  )
}

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 9,
}