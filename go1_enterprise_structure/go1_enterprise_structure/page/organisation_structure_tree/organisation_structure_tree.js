frappe.pages['organisation-structure-tree'].on_page_load = function(wrapper) {
	// Create the page
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Organisation Structure',
		single_column: true
	});
	// Add the chart container
	$(wrapper).append(
		`<div class="chart-container" style="height: 1200px; background-color: white"></div>`
	);
	// Add the Font Awesome CSS link
	$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />');
	// Load the scripts and initialize the chart
	loadScripts([
		"https://d3js.org/d3.v7.min.js",
		"https://cdn.jsdelivr.net/npm/d3-org-chart@2.6.0",
		"https://cdn.jsdelivr.net/npm/d3-flextree@2.1.2/build/d3-flextree.js"
		], function() {
			initializeChart();
		}
	);
};
	
function loadScripts(scripts, callback) {
	var index = 0;
	function next() {
		if (index < scripts.length) {
			var script = document.createElement('script');
			script.src = scripts[index];
			script.onload = function() {
				index++;
				next();
			};
			document.head.appendChild(script);
		} 
		else {
			callback();
		}
	}
	next();
}
function initializeChart() {
	frappe.xcall("go1_enterprise_structure.go1_enterprise_structure.page.organization_structure_tree.organization_structure_tree.get_organisation_data")
		.then((r) => {
			var chart ;
			var dataFlattened = r;
			console.log("dataFlattened",dataFlattened);
			chart = new d3.OrgChart()
          .container('.chart-container')
          .data(dataFlattened)
          .nodeHeight((d) => 105)
          .nodeWidth((d) => {
            return 255;
          })
          .childrenMargin((d) => 50)
          .compactMarginBetween((d) => 25)
          .compactMarginPair((d) => 50)
          .neightbourMargin((a, b) => 25)
          .siblingsMargin((d) => 25)
          .buttonContent(({ node, state }) => {
            return `<div style="px;color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${
              node.children
                ? `<i class="fas fa-angle-up"></i>`
                : `<i class="fas fa-angle-down"></i>`
            }</span> ${node.data._directSubordinates}  </div>`;
          })
          .linkUpdate(function (d, i, arr) {
            d3.select(this)
              .attr('stroke', (d) =>
                d.data._upToTheRootHighlighted ? '#080808' : '#080808'
              )
              .attr('stroke-width', (d) =>
                d.data._upToTheRootHighlighted ? 5 : 1
              );

            if (d.data._upToTheRootHighlighted) {
              d3.select(this).raise();
            }
          })
          .nodeContent(function (d, i, arr, state) {
            const color = '#FFFFFF';
            return `
            <div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #141414">
				<div style="margin-right:10px;margin-top:10px;float:right">${d.data.type}</div>
				<div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:45px"> ${d.data.name} </div>
           	</div>
  			`;
          })
          .render();
		// 	chart = new d3.OrgChart()
		// 	.container('.chart-container')
		// 	.data(dataFlattened)
		// 	.nodeWidth((d) => 250)
		// 	.initialZoom(0.7)
		// 	.nodeHeight((d) => 175)
		// 	.childrenMargin((d) => 40)
		// 	.compactMarginBetween((d) => 15)
		// 	.compactMarginPair((d) => 80)
		// 	.nodeContent(function (d, i, arr, state) {
		// 	return `
		// 		<div style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height}px;border-radius:2px;overflow:visible">
		// 		<div style="height:${d.height - 32}px;padding-top:0px;background-color:white;border:1px solid #12e061;">
		// 		<img src="${d.data.imageUrl}" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />
		// 		<div style="margin-right:10px;margin-top:15px;float:right">${d.data.type}</div>
		// 		<div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${d.width - 2}px;border-radius:1px"></div>
		// 		<div style="padding:20px; padding-top:35px;text-align:center">
		// 		<div style="color:#111672;font-size:16px;font-weight:bold">${d.data.name}</div>
		// 		<div style="color:#404040;font-size:16px;margin-top:4px">${d.data.positionName}</div>
		// 		</div>
		// 		<div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
		// 		<div>Direct Children: ${d.data._directSubordinates} </div>
		// 		<div>Overall Children: ${d.data._totalSubordinates} </div>
		// 		</div>
		// 		</div>
		// 		</div>
		// 	`;
		// })
		// .render();
	})
}

