import React, { PureComponent } from 'react';
import styles from './style.less';
// TODO: pc 滑动触发点击事件待优化.....
export default class Carousel extends PureComponent {
  constructor(props) {
    super(props);
    this.onTouchBodyRefs = React.createRef();
    this.state = {
      onMouseStartTitleStatus: false,
      clickStatus: true,
    };
  }
  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.numSrcoll !== this.props.numSrcoll) {
      return this.props.numSrcoll;
    }
    return null;
  }
  componentDidMount() {
    const { id, numSrcoll } = this.props;
    if (numSrcoll > 0) {
      this.setSrcoll(id, numSrcoll);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const { id, numSrcoll } = this.props;
      if (numSrcoll > 0) {
        this.setSrcoll(id, numSrcoll);
      }
    }
  }
  /**
   * @param {*} id 滚动容器的id
   * @param {*} n 位移个数
   */
  setSrcoll = (id, n) => {
    try {
      const dom = document.getElementById(id);
      if (!dom) {
        return false;
      }
      const divWidth = dom.children[0].children[0].offsetWidth;
      dom.scrollTo(n * divWidth, 0);
    } catch (error) {
      console.log(error);
    }
  };
  onMouseLeave = () => {
    this.setState({
      onMouseStartTitleStatus: false,
      clickStatus: true,
    });
  };
  onMouseDown = e => {
    this.setState({
      onMouseStartTitleStatus: true,
      startingPointClientX: e.clientX,
      clickStatus: true,
    });
  };
  onMouseUp = e => {
    e.preventDefault();
    this.setState({
      onMouseStartTitleStatus: false,
    });
  };
  onMouseMove = (e, num) => {
    const { onMouseStartTitleStatus, startingPointClientX } = this.state;
    if (onMouseStartTitleStatus) {
      const { current } = this.onTouchBodyRefs;
      const { scrollLeft } = current.parentElement;
      const sLeft = (current.parentElement.scrollLeft =
        scrollLeft + startingPointClientX - e.clientX);
      const x = e.clientX;
      this.setState({ startingPointClientX: x, clickStatus: sLeft > 0 ? false : true });
    }
  };
  render() {
    const { item, data, id } = this.props;
    return (
      <>
        {data && (
          <div className={styles.srcoll} id={id || ''}>
            <div
              className={styles.onTouchBody}
              ref={this.onTouchBodyRefs}
              onMouseLeave={e => this.onMouseLeave(e)}
              onMouseDown={e => this.onMouseDown(e)}
              onMouseMove={e => this.onMouseMove(e, 1)}
              onMouseUp={e => this.onMouseUp(e)}
            >
              {data.length > 0 &&
                data.map((value, index) => (
                  <div key={index} onMouseUp={e => this.onMouseUp(e)}>
                    {item(value, index, this.state.clickStatus)}
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
