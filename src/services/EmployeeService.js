import axios from "axios";

export const URL_EMPLOYEE_SERVICE = "http://localhost:8019/employee"

export const listEmployees = async () => await axios.get(URL_EMPLOYEE_SERVICE+"/v1/employee/get/all")

export const saveEmployee = async (employee) => await axios.post(URL_EMPLOYEE_SERVICE+"/v1/employee/create",employee)

export const getEmployeeById = async (id) => await axios.get(URL_EMPLOYEE_SERVICE+`/v1/employee/get/`+id)

export const deleteEmployeeById = async (id) => await axios.delete(URL_EMPLOYEE_SERVICE+`/v1/employee/delete/`+id)

