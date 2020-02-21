import React, { Component } from 'react';

class TimeText extends Component {
  constructor(props) {
    super(props);
    const time = this.processTimer();
    this.state = {
      time,
      isExceed: props.sport == 1 && props.elapseTime > props.maxElapseTime,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.elapseTime !== this.props.elapseTime) {
      this.setState({
        time: this.processTimer(),
        isExceed: this.props.elapseTime > this.props.maxElapseTime,
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.times);
  }

  componentDidMount() {
    this.timeDifference();
  }
  processTimer = () => {
    const { elapseTime, maxElapseTime, sport, minElapseTime } = this.props;
    if (sport == 1) {
      return elapseTime > maxElapseTime ? maxElapseTime : elapseTime;
    } else if (sport == 2) {
      return minElapseTime >= elapseTime ? minElapseTime : elapseTime;
    }
  };
  timeDifference = () => {
    const timeInterval = 10000;
    this.times = setInterval(() => {
      const { paused, maxElapseTime, sport, minElapseTime } = this.props;
      const { time } = this.state;
      if (!paused) {
        if (sport == 1) {
          if (time / 1 + timeInterval > maxElapseTime) {
            clearInterval(this.times);
            this.setState({ time: maxElapseTime, isExceed: true });
          } else {
            this.setState({ time: this.state.time / 1 + timeInterval });
          }
        } else if (sport == 2) {
          if (time / 1 - timeInterval > minElapseTime) {
            this.setState({ time: time / 1 - timeInterval });
          } else {
            clearInterval(this.times);
            this.setState({ time: minElapseTime });
          }
        }
      }
    }, timeInterval);
  };

  render() {
    const { time, isExceed } = this.state;
    const { text, isHied } = this.props;
    let processTime = Math.floor(time / (60 * 1000));
    processTime = isExceed ? `${processTime}+'` : `${processTime}'`;
    processTime = isHied ? '' : processTime;
    return <React.Fragment>{`${text} ${processTime}`}</React.Fragment>;
  }
}

export default TimeText;
