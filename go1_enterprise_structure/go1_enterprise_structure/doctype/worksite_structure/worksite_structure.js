// Copyright (c) 2024, Sermadurai Paranjothi and contributors
// For license information, please see license.txt

frappe.ui.form.on("Worksite Structure", {
	refresh(frm) {
		if(frm.doc.worksite_type){
			frm.set_df_property("worksite_name", "label", `${frm.doc.worksite_type} Name`)
		}
		frappe.call({
		    method:"go1_enterprise_structure.go1_enterprise_structure.api.get_worksite_levels",
		    async:false,
		    callback: function(r){
				if(r.message.length==0){
					frappe.throw("Need to set <b>Worksite Level First</b>")
				}
				frm.set_df_property('worksite_type', 'options', r.message)
		    }
		}),
		frm.set_query("parent_worksite_structure", function(frm){
		    return {
		        filters : {
		            "name": ""
		        }
		    }
		})
	},
	worksite_type(frm){
		if(frm.doc.worksite_type){
			frm.set_df_property("worksite_name", "label", `${frm.doc.worksite_type} Name`)
		}
	    frm.set_value('worksite_name', "")
	    frm.set_value('parent_worksite_structure', "")
	    frm.refresh_field('worksite_name')
	    frm.refresh_field('parent_worksite_structure')
	    frappe.call({
		    method:"go1_enterprise_structure.go1_enterprise_structure.api.get_worksite_parents",
		    args:{"worksite_type":frm.doc.worksite_type},
		    async:false,
		    callback: function(r){
				console.log("get_worksite_parents",r.message);
				
		        frm.set_query("parent_worksite_structure", function(frm){
        		    return {
        		        filters : {
        		            "name": ["in", r.message]
        		        }
        		    }
        		})
		    }
		})
	}
});
