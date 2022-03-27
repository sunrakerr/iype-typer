let getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let pauseStartIntervalMaker = (totalTime, breaks) => {
  let pauseIntervals = [];
  let oneFraction = Math.floor(totalTime / breaks);
  while (totalTime > 0) {
    totalTime -= oneFraction;
    let remTime = totalTime;
    //this is so that the eye doesnt immediately close
    if (oneFraction > 4) {
      remTime += getRandomIntInclusive(0, 4);
    }
    pauseIntervals.push(remTime);
  }
  pauseIntervals.push(getRandomIntInclusive(0, 4));
  // console.log(pauseIntervals);
  return pauseIntervals;
};

export { getRandomIntInclusive, pauseStartIntervalMaker };
