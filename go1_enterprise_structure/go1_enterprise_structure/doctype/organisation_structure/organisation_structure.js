// Copyright (c) 2024, Sermadurai Paranjothi and contributors
// For license information, please see license.txt

frappe.ui.form.on('Organisation Structure', {
	refresh(frm) {
		if(frm.doc.organisation_type){
			frm.set_df_property("organisation_name", "label", `${frm.doc.organisation_type} Name`)
		}
		frappe.call({
		    method:"go1_enterprise_structure.go1_enterprise_structure.api.get_organisation_levels",
		    async:false,
		    callback: function(r){
		        frm.set_df_property('organisation_type', 'options', r.message)
		    }
		}),
		frm.set_query("parent_organisation_structure", function(frm){
		    return {
		        filters : {
		            "name": ""
		        }
		    }
		})
	},
	organisation_type(frm){
		if(frm.doc.organisation_type){
			frm.set_df_property("organisation_name", "label", `${frm.doc.organisation_type} Name`)
		}
	    frm.set_value('organisation_name', "")
	    frm.set_value('parent_organisation_structure', "")
	    frm.refresh_field('organisation_name')
	    frm.refresh_field('parent_organisation_structure')
	    frappe.call({
		    method:"go1_enterprise_structure.go1_enterprise_structure.api.get_organisation_parents",
		    args:{"organisation_type":frm.doc.organisation_type},
		    async:false,
		    callback: function(r){
		        frm.set_query("parent_organisation_structure", function(frm){
        		    return {
        		        filters : {
        		            "name": ["in", r.message]
        		        }
        		    }
        		})
		    }
		})
	}
})