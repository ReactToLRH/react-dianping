import React, { Component } from 'react';
import LikeItem from "../LikeItem";
import "./style.css";
import { dataMock } from './dataMock';

class LikeList extends Component {
  render() {
    const data = dataMock
    return (
      <div className="likeList">
        <div className="likeList__header">猜你喜欢</div>
        <div className="likeList__list">
          {
            data.map((item, index) => {
              return <LikeItem key={item.id} data={item}/>
            })
          }
        </div>
      </div>
    );
  }
}

export default LikeList;
