/*** DRAWING METHODS ***/
/*
 * First pattern.
 * Draws gradient of lines. Lines are drawn line-by-line.
 */
function lines() {
  if (ypos == 0) {
    setUpdateVals();
    currColor = randRgb();
  } else {
    currColor = updateRgb(currColor);
  }
  ctx.fillStyle = rgb(currColor);
  ctx.clearRect(0, ypos, w, bh);
  ctx.fillRect(0, ypos, w, bh);
  ypos = (ypos + bh) % h;
}

/*
 * Second pattern.
 * Draws gradient of lines. Lines are drawn block-by-block.
 */
function lines2() {
  if (ypos == 0 && xpos == 0) {
    setUpdateVals();
    currColor = randRgb();
  } else if (xpos == 0) {
    console.log("yo");
    currColor = updateRgb(currColor);
  }
  ctx.fillStyle = rgb(currColor);
  ctx.clearRect(xpos, ypos, bw, bh);
  ctx.fillRect(xpos, ypos, bw, bh);
  xpos = (xpos + bw) % w;
  if (xpos == 0) {
    ypos = (ypos + bh) % h;
  }
}


/*** COLOR METHODS ***/
/* Makes rgb string out of rgb vector. */
function rgb(rgbVec) {
  return "rgb(" + rgbVec.join() + ")";
}

/* Generates random rgb vectors. Values are constrained within a hardcoded range. */
function randRgb() {
  // constrain values
  var hi = 200;
  var lo = 70;
  return [randRange(lo, hi), randRange(lo, hi), randRange(lo, hi)];
}

/* RGB update values for each round. */
updateVals = [0, 0, 0];

/* Update the passed-in rgb vector with the values from updateVals. */
function updateRgb(rgbVec) {
  for (i = 0; i < N; i++) {
    rgbVec[i] = boundRNum(rgbVec[i] + updateVals[i]);
  }
  return rgbVec;
}

/* Set values in updateVals. */
function setUpdateVals() {
  lo = 5;
  hi = 20;
  for (i = 0; i < N; i++) {
    updateVals[i] = randRange(lo, hi);
  }
}

/* Helper function to generate a random number within a range. */
function randRange(lo, hi) {
  return (Math.random() * hi << 0) + lo;
}

/*
 * Bound random number between 0 and 255. Use modulus for this. Multiple ways
 * that this can be implemented.
 */
function boundRNum(n) {
  return n % 256;
}


/*** MISC ***/
function getUrl() {
  var dataURL = canvas.toDataURL();
  window.prompt("Image URL", dataURL);
}

/*
 * Initialize some global variables and choose which screensaver to run.
 */
function start(i) {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  w = canvas.width;
  h = canvas.height;
  bw = w / 20;
  bh = h / 10;
  xpos = 0;
  ypos = 0;
  N = 3;

  if (i == 0) {
    lines();
    setInterval(lines, 450);
  } else if (i == 1) {
    lines2();
    setInterval(lines2, 50);
  }
}
