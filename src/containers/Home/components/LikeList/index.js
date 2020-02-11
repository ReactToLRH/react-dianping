import React, { Component } from 'react';
import LikeItem from '../LikeItem';
import Loading from '../../../../components/Loading';
import "./style.css";
import { dataMock } from './dataMock';

class LikeList extends Component {
  constructor (props) {
    super(props);
    this.myRef = React.createRef();
    this.state ={
      data: dataMock,
      loadTimes: 1
    }
    this.removeListener = false; // 移除监听标识
  }

  render() {
    const {data, loadTimes} = this.state;
    return (
      <div ref={this.myRef} className="likeList">
        <div className="likeList__header">猜你喜欢</div>
        <div className="likeList__list">
          {
            data.map((item, index) => {
              return <LikeItem key={item.id} data={item}/>
            })
          }
        </div>
        {
          loadTimes < 3 ? 
            (<Loading />)
            :
            (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className="likeList__viewAll">查看更多</a>
            )
        }
      </div>
    );
  }

  componentDidMount () {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate () {
    if (this.state.loadTimes >= 3 && !this.removeListener) {
      document.removeEventListener('scroll', this.handleScroll);
      this.removeListener = true;
    }
  }

  componentWillUnmount () {
    if (!this.removeListener) {
      document.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const likeListTop = this.myRef.current.offsetTop;
    const likeListHeight = this.myRef.current.offsetHeight;
    if (scrollTop >= likeListHeight + likeListTop - screenHeight) {
      const newData = this.state.data.concat(dataMock);
      const newLoadTimes = this.state.loadTimes + 1;
      setTimeout(() => {
        this.setState({
          data: newData,
          loadTimes: newLoadTimes
        })
      }, 1000)
    }
  }
}

export default LikeList;
