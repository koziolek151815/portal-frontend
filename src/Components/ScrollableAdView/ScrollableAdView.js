import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Ad from "../Ad/Ad";
import jwt from "jwt-decode";


class ScrollableAdView extends React.Component {
    state = {
        items: [],
        hasMore: true,
        currentPage: 0
    };

    componentDidMount() {
        this.fetchMoreData();
        if(localStorage.getItem('token')){this.currentUser = jwt(localStorage.getItem('token'))['sub'];}
        console.log(this.currentUser);
    }

    getDataFromApi = async (page) => {
        return await axios.get(
            process.env.REACT_APP_BACKEND_URL + `/${this.props.endpoint}?page=${page}&size=8&sort=${this.props.sort}`,
        );
    }

    fetchMoreData = () => {
        this.getDataFromApi(this.state.currentPage).then((result) => {
            this.setState({
                hasMore: !result.data.empty,
                items: this.state.items.concat(result.data.content),
                currentPage: this.state.currentPage + 1
            });
        })
    };
    deleteAd = (id) => {
        axios.delete(
            process.env.REACT_APP_BACKEND_URL + `/${this.props.endpoint}/${id}`,
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).then(() => {
            const filteredArray = this.state.items.filter(item => item.id !== id)
            this.setState({items: filteredArray});
        })
    };

    render() {
        return (
            <div>
                <InfiniteScroll
                    scrollThreshold={0.01}
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{textAlign: "center"}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {this.state.items.map((ad) => (
                        <Ad ad={ad} key={ad.id} currentUser={this.currentUser} deleteAd={this.deleteAd} showLink={true}/>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}

export default ScrollableAdView;
