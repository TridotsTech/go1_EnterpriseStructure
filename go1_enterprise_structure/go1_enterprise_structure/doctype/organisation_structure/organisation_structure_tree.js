frappe.treeview_settings['Organisation Structure'] = {
    breadcrumb: 'Organisation Structure',
    title: 'Organisation Structure',
    // filters: [
    //     {
    //         fieldname: 'group',
    //         fieldtype:'Link',
    //         options: 'Group',
    //         label: 'Group'
    //     },
	// 	{
    //         fieldname: 'financial_services-group',
    //         fieldtype:'Link',
    //         options: 'Financial Services Group',
    //         label: 'Financial Services Group'
    //     },
	// 	{
    //         fieldname: 'company',
    //         fieldtype:'Link',
    //         options: 'Company',
    //         label: 'Company'
    //     },
	// 	{
    //         fieldname: 'sbu',
    //         fieldtype:'Link',
    //         options: 'SBU',
    //         label: 'SBU'
    //     },
	// 	{
    //         fieldname: 'department',
    //         fieldtype:'Link',
    //         options: 'Department',
    //         label: 'Department'
    //     },
	// 	{
    //         fieldname: 'function',
    //         fieldtype:'Link',
    //         options: 'Function',
    //         label: 'Function'
    //     },
	// 	{
    //         fieldname: 'product',
    //         fieldtype:'Link',
    //         options: 'Product',
    //         label: 'Product'
    //     },
	// 	{
    //         fieldname: 'sub_product',
    //         fieldtype:'Link',
    //         options: 'Sub Product',
    //         label: 'Sub Product'
    //     },
    // ],
    // get_tree_nodes: 'path.to.whitelisted_method.get_children',
    // add_tree_node: 'path.to.whitelisted_method.handle_add_account',
    // fields for a new node
    fields: [
        {
            fieldtype: 'Link', fieldname: 'organisation_type',
            label: 'Organisation Type', reqd: true, options: "Organisation Level"
        },
        {
            fieldtype: 'Dynamic Link', fieldname: 'organisation_name',
            label: 'Organisation Name', reqd:true, options: 'organisation_type'
        },
        {
            fieldtype: 'Check', fieldname: 'is_group', label: 'Is Group'
        }
    ],
    // ignore fields even if mandatory
    // ignore_fields: ['parent_account'],
    // to add custom buttons under 3-dot menu group
    // menu_items: [
    //     {
    //         label: 'New Company',
    //         action: function() { frappe.new_doc('Company', true) },
    //         condition: 'frappe.boot.user.can_create.indexOf('Company') !== -1'
    //     }
    // ],
    onload: function(treeview) {
        // frappe.call({
		// 	method:"chola_hrms.chola_hrms.api.get_hierarchy_parents",
		// 	args:{"hierarchy_type":frm.doc.hierarchy_type},
		// 	async:false,
		// 	callback: function(r){
		// 		var filters = r.message
		// 		// frm.set_query("parent_hierarchy_structure", function(frm){
		// 		// 	return {
		// 		// 		filters : {
		// 		// 			"name": ["in", r.message]
		// 		// 		}
		// 		// 	}
		// 		// })
		// 	}
		// })
    },
    post_render: function(treeview) {
        // triggered when tree is instanciated
    },
    onrender: function(node) {
        // triggered when a node is instanciated
    },
    on_get_node: function(nodes) {
        // triggered when `get_tree_nodes` returns nodes
    },
    // enable custom buttons beside each node
    // extend_toolbar: true,
    // custom buttons to be displayed beside each node
    // toolbar: [
    //     {
    //         label: 'Add Child',
    //         condition: function(node) {},
    //         click: function() {},
    //         btnClass: 'hidden-xs'
    //     }
    // ]
}