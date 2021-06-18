import React from "react";
import './Ad.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {formatDate} from "../../Utility/Date";


class Ad extends React.Component {

    render() {
        return (
            <div className="Post container my-2 border rounded">
                <div className="col-md-12 py-2 blogShort">
                    <span className="float-left"> Author: {this.props.ad.user.username}</span>
                    <span className="float-right">{formatDate(this.props.ad.adCreatedDate)}</span><br/>
                    <article><p>
                        {this.props.ad.content}
                    </p></article>
                    {this.props.ad.user.email === this.props.currentUser ? <>
                        <button onClick={() => this.props.deleteAd(this.props.ad.id)}
                                className={"btn btn-default btn-danger float-right"}>Delete
                        </button>
                        <a className="btn btn-default btn-info float-right"
                        href={`/updateAd/${this.props.ad.id}`}>Edit</a>
                    </> : null}
                    <br/>
                </div>
            </div>
        );
    };
}

export default Ad;
