import React, { useState, useEffect } from "react";
import axios from "axios";
import './Stats.css';

function Stats() {
  const [urls, setUrlList] = useState([]);
  useEffect(() => {
    axios.get('api/urllist')
      .then(res => setUrlList(res.data) )
      .catch(err=> console.log(err));
  }, []);

  return (<>
      <div className="container">
        <h1>Analytics</h1>
        <div className="row">
            <ul className="list-group list-group-flush">
            { urls.map( (url, index) => 
                <li key={url._id} className="list-group-item">
                    <p><strong>{url.longUrl}</strong></p>
                    <p>{url.shortUrl}</p>
                    <p>Total clicks: {url.clicks}</p>
                    <p>Top countries: </p>
                </li> ) }
            </ul>
        </div>
      </div>
  </>);
}

export default Stats;