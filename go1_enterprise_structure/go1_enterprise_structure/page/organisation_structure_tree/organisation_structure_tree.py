import frappe

@frappe.whitelist()
def get_organisation_data():
    dataFlattened = []
    nodes = frappe.get_all('Organisation Structure', fields=['*'])
    # frappe.log_error("nodes",nodes)
    for node in nodes:
        obj={
            "name": node.organisation_name,
            "imageUrl": "",
            "area": "",
            "profileUrl": "",
            "office": "",
            "tags": "",
            "isLoggedUser": "false",
            "positionName": "",
            "id": node.name,
            "parentId":  node.parent_organisation_structure,
            "size": "",
            "type":node.organisation_type
        }
        direct=frappe.db.count("Organisation Structure",{"parent_organisation_structure":node.organisation_name})
        obj["_directSubordinates"]=direct
        obj["_totalSubordinates"]=len(nodes)
        dataFlattened.append(obj)
    # frappe.log_error("dataFlattened",dataFlattened)
    return dataFlattened