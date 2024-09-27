import frappe

@frappe.whitelist()
def get_organisation_levels():
	levels = frappe.db.get_all("Organisation Level", pluck='name', order_by='organisation_level asc')
	if levels:
		levels = "\n".join(levels)
	frappe.response.message = levels

@frappe.whitelist()
def get_organisation_parents(organisation_type=None):
	level = frappe.db.get_value("Organisation Level", organisation_type, ['organisation_level'])
	if not level:
		level = 0
	else:
		level = level - 1
	if level != 0:
		organisation_parent_type = frappe.db.get_value("Organisation Level", pluck='name', filters={"organisation_level":level})
		organisation_parent_names = frappe.db.get_all("Organisation Structure", filters={"organisation_type":organisation_parent_type}, pluck='name')
		frappe.response.message = organisation_parent_names
	else:
		frappe.response.message = None

@frappe.whitelist()
def get_worksite_levels():
	levels = frappe.db.get_all("Worksite Level", pluck='name', order_by='worksite_level asc')
	if levels:
		levels = "\n".join(levels)
	frappe.response.message = levels

@frappe.whitelist()
def get_worksite_parents(worksite_type=None):
	level = frappe.db.get_value("Worksite Level", worksite_type, ['worksite_level'])
	if not level:
		level = 0
	else:
		level = level - 1
	if level != 0:
		worksite_parent_type = frappe.db.get_value("Worksite Level", pluck='name', filters={"worksite_level":level})
		worksite_parent_names = frappe.db.get_all("Worksite Structure", filters={"worksite_type":worksite_parent_type}, pluck='name')
		frappe.response.message = worksite_parent_names
	else:
		frappe.response.message = None