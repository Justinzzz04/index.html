/* Load CSV, convert type, and log summaries */
d3.csv("data/tvBrandCount.csv", d => ({
  brand: d.brand,
  count: +d.count // '+' converts string to number
})).then(data => {
  console.log("Full Data:", data);
  console.log("Rows:", data.length);
  console.log("Max count:", d3.max(data, d => d.count));
  console.log("Min count:", d3.min(data, d => d.count));
  console.log("Extent:", d3.extent(data, d => d.count));

  // Sort descending by count
  data.sort((a, b) => d3.descending(a.count, b.count));

  // Pass loaded data to the chart renderer
  if (typeof createBarChart === "function") {
    createBarChart(data);
  }
});