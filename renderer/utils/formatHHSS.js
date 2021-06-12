function secondsToHHMM(seconds) {
  return (
    Math.floor(seconds / 3600) +
    ":" +
    ("0" + (Math.floor(seconds / 60) % 60)).slice(-2)
  );
}

export default secondsToHHMM;
