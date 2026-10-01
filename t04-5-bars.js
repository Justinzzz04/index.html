const createBarChart = (data) => {
  // --- Sizes (logical vs display) ---
  const viewW = 500;
  const viewH = Math.max(220, data.length * 28);
  const displayW = 640;
  const displayH = Math.min(480, data.length * 24 + 40);

  // --- SVG Root ---
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", `0 0 ${viewW} ${viewH}`)
    .attr("width", displayW)
    .attr("height", displayH)
    .style("border", "1px solid #ccc");

  // --- Scales ---
  const xMax = d3.max(data, d => d.count);
  const xScale = d3.scaleLinear()
    .domain([0, xMax])
    .range([0, viewW - 120]); // Reserve horizontal space for labels

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, viewH])
    .paddingInner(0.2)
    .paddingOuter(0.1);

  const labelX = 100; // Alignment offset for category labels and bar start

  // --- Group per row (bar + labels move together) ---
  const barAndLabel = svg.selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // --- Bar Rectangle ---
  barAndLabel.append("rect")
    .attr("x", labelX)
    .attr("y", 0)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");

  // --- Category Label (left of bar) ---
  barAndLabel.append("text")
    .text(d => d.brand)
    .attr("x", labelX - 6)
    .attr("y", yScale.bandwidth() / 2 + 4)
    .attr("text-anchor", "end")
    .style("font-family", "sans-serif")
    .style("font-size", "13px");

  // --- Value Label (end of bar) ---
  barAndLabel.append("text")
    .text(d => d.count)
    .attr("x", d => labelX + xScale(d.count) + 6)
    .attr("y", yScale.bandwidth() / 2 + 4)
    .style("font-family", "sans-serif")
    .style("font-size", "13px");
};