import React from "react";
import ScrollableAdView from "../ScrollableAdView/ScrollableAdView";
function MainPage() {
    return (
        <div className="MainPage">
            <ScrollableAdView endpoint="ads" sort="id,DESC"/>
        </div>
    );
}

export default MainPage;
