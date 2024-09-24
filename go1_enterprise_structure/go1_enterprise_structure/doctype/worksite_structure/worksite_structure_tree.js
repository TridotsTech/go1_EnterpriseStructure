frappe.treeview_settings['Worksite Structure'] = {
    breadcrumb: 'Worksite Structure',
    title: 'Worksite Structure',
    // filters: [
    //     {
    //         fieldname: 'continent',
    //         fieldtype:'Link',
    //         options: 'Continent',
    //         label: 'Continent'
    //     },
	// 	{
    //         fieldname: 'country',
    //         fieldtype:'Link',
    //         options: 'Country',
    //         label: 'Country'
    //     },
	// 	{
    //         fieldname: 'sbu_l',
    //         fieldtype:'Link',
    //         options: 'SBU_L',
    //         label: 'SBU_L'
    //     },
	// 	{
    //         fieldname: 'zone',
    //         fieldtype:'Link',
    //         options: 'Zone',
    //         label: 'Zone'
    //     },
	// 	{
	// 		fieldname: 'state',
    //         fieldtype:'Link',
    //         options: 'State',
    //         label: 'State'
    //     },
	// 	{
	// 		fieldname: 'region',
	// 		fieldtype:'Link',
	// 		options: 'Region',
	// 		label: 'Region'
	// 	},
	// 	{
    //         fieldname: 'area',
    //         fieldtype:'Link',
    //         options: 'Area',
    //         label: 'Area'
    //     },
	// 	{
    //         fieldname: 'location',
    //         fieldtype:'Link',
    //         options: 'Location',
    //         label: 'Location'
    //     },
    // ],
    // get_tree_nodes: 'path.to.whitelisted_method.get_children',
    // add_tree_node: 'path.to.whitelisted_method.handle_add_account',
    // fields for a new node
    fields: [
        {
            fieldtype: 'Link', fieldname: 'worksite_type',
            label: 'Worksite Type', reqd: true, options: "Worksite Level"
        },
        {
            fieldtype: 'Dynamic Link', fieldname: 'worksite_name',
            label: 'Worksite Name', reqd:true, options: 'worksite_type'
        },
        {
            fieldtype: 'Check', fieldname: 'is_group', label: 'Is Group'
        }
    ],
}