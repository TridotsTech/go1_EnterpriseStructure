# Copyright (c) 2024, Sermadurai Paranjothi and contributors
# For license information, please see license.txt

import frappe
from frappe.utils.nestedset import NestedSet


class WorksiteStructure(NestedSet):
	def autoname(self):
		level = frappe.db.get_value("Worksite Level", self.worksite_type, "worksite_level")
		prefix = f"L{level}"
		series = "0001"
		previous_level = frappe.db.get_all("Worksite Structure", filters={"worksite_type":self.worksite_type}, pluck='name', order_by="creation asc")
		if previous_level:
			suffix = int(previous_level[-1].split(' - ')[1]) + 1
			series = "{:04d}".format(suffix)
		self.name = f"{prefix} - {series} - {self.worksite_name}"
