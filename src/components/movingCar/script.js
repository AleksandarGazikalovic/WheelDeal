const path =
  "M970 39c436-4 871-27 871 134s-454 210-871 210c-419 0-871-22-871 144s456 201 871 205c401-4 871-15 871 147s-486 222-871 222c-427 0-883-16-879 156s447 164 879 164";
const height = 1450; // equivalent to viewbox y2
const width = 1920; // equivalent to viewbox x2

const motionPath = new ResponsiveMotionPath({
  height,
  width,
  path,
});
// To convert the path data to points, we need an SVG path element.
const svgContainer = document.createElement("div");
// To create one though, a quick way is to use innerHTML
svgContainer.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg">
    <path d="${path}" stroke-width="${strokeWidth}"/>
  </svg>`;
const pathElement = svgContainer.querySelector("path");
convertPathToData = (path) => {
  // To convert the path data to points, we need an SVG path element.
  const svgContainer = document.createElement("div");
  // To create one though, a quick way is to use innerHTML
  svgContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">
                                <path d="${path}"/>
                              </svg>`;
  const pathElement = svgContainer.querySelector("path");
  // Now to gather up the path points.
  const DATA = [];
  // Iterate over the total length of the path pushing the x and y into
  // a data set for d3 to handle 👍
  for (let p = 0; p < pathElement.getTotalLength(); p++) {
    const { x, y } = pathElement.getPointAtLength(p);
    DATA.push([x, y]);
  }
  return DATA;
};
getMaximums = (data) => {
  const X_POINTS = data.map((point) => point[0]);
  const Y_POINTS = data.map((point) => point[1]);
  return [
    Math.max(...X_POINTS), // x2
    Math.max(...Y_POINTS), // y2
  ];
};
getRatios = (maxs, width, height) => [maxs[0] / width, maxs[1] / height];
d3.line()(data);
const widthRatio = (height - width) / height;
const widthOffset = (ratio * containerWidth) / 2;
const xScale = d3
  .scaleLinear()
  .domain([0, maxWidth])
  .range([widthOffset, containerWidth * widthRatio - widthOffset]);

// Function to update the scroll percentage state based on the scroll position
const updateScrollPercentage = () => {
  const totalScrollableDistance =
    document.documentElement.scrollHeight - window.innerHeight;
  const currentScrollPercentage =
    (window.scrollY / totalScrollableDistance) * 100;
  setScrollPercentage(currentScrollPercentage);
};
const SCALED_POINTS = data.map((POINT) => [xScale(POINT[0]), yScale(POINT[1])]);
d3.line()(SCALED_POINTS); // Scaled path string that is scaled to our container
ELEMENT.style.setProperty("--path", `"${newPath}"`);
const setPath = () => {
  const scaledPath = responsivePath.generatePath(
    CONTAINER.offsetWidth,
    CONTAINER.offsetHeight
  );
  ELEMENT.style.setProperty("--path", `"${scaledPath}"`);
};
const SizeObserver = new ResizeObserver(setPath);
SizeObserver.observe(CONTAINER);
