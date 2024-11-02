import { useEffect, useState } from "react"
import { deleteEmployeeById, listEmployees } from "../services/EmployeeService"
import { useNavigate } from "react-router-dom";



const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState();

  const navigator = useNavigate();


  useEffect(() => {
   getAllEmployees()
  },[])

  function getAllEmployees(){
    listEmployees().then((response) => {
      setEmployees(response.data.data)
    }).catch(error => {
      console.error(error)
      setError(err);
    })
  }

  function AddNewEmployee(){
    navigator('/add-employees')
  }
  function updateEmployee(id){
    navigator(`/edit-employees/${id}`)
  }
  function deleteEmployee(id){
    deleteEmployeeById(id).then((response) => {
      console.log(response.data)
      if(response.data){
        getAllEmployees()
      }else{
        alert('Already Deleted')
        getAllEmployees()
      }
      
    }).catch()
      
    
  }

  return (
    <div className="container">
      <h2 className="text-center" >List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={AddNewEmployee}>Add Employee</button>
      {error ? 
        <h1>error has been occured: {error}</h1>
        :
          <table className="table table-striped table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              employees && employees?.map(employee =>
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
                <td>
                  <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button >
                  <button style={{marginLeft:"20px"}} className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}>Delete</button >
                </td>
                </tr>
              )
            }
          </tbody>
        </table>
        }
    </div>
  )
}

export default ListEmployeeComponent
