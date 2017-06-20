/*** DRAWING METHODS ***/
/*
 * First pattern.
 * Draws gradient of lines. Lines are drawn line-by-line.
 */
function lines(flip) {
  if (ypos == 0) {
    setUpdateVals();
    currColor = randRgb();
  } else {
    currColor = updateRgb(currColor);
  }
  var updates = [0, ypos, w, bh];
  if (flip) {
    flipUpdates(updates);
  }
  ctx.fillStyle = rgb(currColor);
  ctx.clearRect.apply(ctx, updates);
  ctx.fillRect.apply(ctx, updates);
  if (flip) {
    ypos = (ypos + bw) % w; // pretend ypos is xpos
  } else {
    ypos = (ypos + bh) % h;
  }
}

/*
 * Second pattern.
 * Draws gradient of lines. Lines are drawn block-by-block.
 */
function lines2(flip, blocky=false) {
  if (ypos == 0 && xpos == 0) {
    setUpdateVals();
    currColor = randRgb();
  } else {
    if (blocky) {
      currColor = updateRgb(currColor);
    } else if (xpos == 0) {
      currColor = updateRgb(currColor);
    }
  }
  var updates = [xpos, ypos, bw, bh];
  if (flip) {
    flipUpdates(updates);
  }
  ctx.fillStyle = rgb(currColor);
  ctx.clearRect.apply(ctx, updates);
  ctx.fillRect.apply(ctx, updates);
  if (flip) {
    xpos = (xpos + bh) % h; // pretend xpos is ypos
    if (xpos == 0) {
      ypos = (ypos + bw) % w; // pretend ypos is xpos
    }
  } else {
    xpos = (xpos + bw) % w;
    if (xpos == 0) {
      ypos = (ypos + bh) % h;
    }
  }
}

/*
 * Third pattern.
 * Draws blocks. Updates colors every block.
 */
function blocks(flip) {
  lines2(flip, true);
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
    // updateVals[i] = randRange(lo, hi);
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


/*** INPUT FUNCTIONS ***/
/*
 * This function will be called when the body is clicked. Asks the user if they
 * want to save a screenshot.
 */
function getUrl() {
  if (window.confirm("Download screenshot?")) {
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href=image;
  }
}

/*
 * Flips rendering.
 */
function flipRendering() {
  clearInterval(interval);
  flipped = !flipped;
  screenFunc(flipped);
  interval = setInterval(screenFunc, updateTime, flipped);
}


/*** MISC ***/
/*
 * Flips an update vector.
 * E.g.
 * [x, y, width, height] -> [y, x, height, width]
 */
function flipUpdates(updates) {
  swap(updates, 0, 1)
  swap(updates, 2, 3)
}

/*
 * Helper function to swap array elements. Does no error checking lol.
 */
function swap(arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
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
  screenFunc = undefined;
  flipped = false;

  // Set key listener
  window.onkeyup = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 70) { // f
      flipRendering();
    }
  }

  funcs = [lines, lines2, blocks];
  updateTimes = [450, 50, 50];
  screenFunc = funcs[i];
  updateTime = updateTimes[i];
  screenFunc(flipped);
  interval = setInterval(screenFunc, updateTime, flipped); // used in flipRendering()
}
