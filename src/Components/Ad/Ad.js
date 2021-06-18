import React from "react";
import './Ad.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {formatDate} from "../../Utility/Date";
import {Button} from "react-bootstrap";

class Ad extends React.Component {

    render() {
        return (
            <div className="Post m-2 p-2 border rounded blogShort">
                    <span className="float-left"> Author: {this.props.ad.user.username}</span>
                    <span className="float-right">{formatDate(this.props.ad.adCreatedDate)}</span>
                    <div style={{clear:"both"}}/>

                    <article><p style={{wordWrap:"break-word"}}>
                        {this.props.ad.content}
                    </p></article>
                    {this.props.ad.user.email === this.props.currentUser ? <>
                        <Button className="float-right" variant="danger" onClick={() => this.props.deleteAd(this.props.ad.id)}>Delete</Button>
                        <Button className="float-right" href={`/updateAd/${this.props.ad.id}`}>Edit</Button>
                        <div style={{clear:"both"}}/>
                    </> : null}
            </div>
        );
    };
}

export default Ad;
