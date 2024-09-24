import frappe

@frappe.whitelist()
def get_organisation_data():
    dataFlattened = []
    nodes = frappe.get_all('Worksite Structure', fields=['*'])
    # frappe.log_error("nodes",nodes)
    for node in nodes:
        obj={
            "name": node.worksite_name,
            "imageUrl": "",
            "area": "",
            "profileUrl": "",
            "office": "",
            "tags": "",
            "isLoggedUser": "false",
            "positionName": "",
            "id": node.name,
            "parentId":  node.parent_worksite_structure,
            "size": "",
            "type":node.worksite_type
        }
        direct=frappe.db.count("Worksite Structure",{"parent_worksite_structure":node.worksite_name})
        obj["_directSubordinates"]=direct
        obj["_totalSubordinates"]=len(nodes)
        dataFlattened.append(obj)
    # frappe.log_error("dataFlattened",dataFlattened)
    return dataFlattened