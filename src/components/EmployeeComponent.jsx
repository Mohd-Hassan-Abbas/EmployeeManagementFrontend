import React, { useEffect, useState } from 'react'
import { getEmployeeById, saveEmployee } from '../services/EmployeeService'
import { createRoutesFromChildren, useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [savedEployee, setSavedEmployee] = useState({})
    const [fetchedEmployee, setFetchedEmployee] = useState({})
    const [errors, setError] = useState({
        firstName:'',
        lastName:'',
        emailId:''
    });
    


    const navigator = useNavigate()
    const{id} = useParams()

    useEffect(() => {

        if(id){
            getEmployeeById(id).then((response) => {
                setFirstName(response.data.data.firstName)
                setLastName(response.data.data.lastName)
                setEmailId(response.data.data.emailId)
              }).catch(error => {
                console.error(error)
              })
        }
        
      },[])

    function handleFirstName(e){
        setFirstName(e.target.value)
    }
    function handleLastName(e){
        setLastName(e.target.value)
    }
    function handleEmailId(e){
        setEmailId(e.target.value)
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigator('/employees'); 
      };

    function loadEmplpyee(e){

        e.preventDefault();

        if(validateForm()){

            let Employee = {firstName,lastName,emailId}
            if(id){
                 Employee = {
                    id,firstName,lastName,emailId
                }
             }
    
            console.log(Employee)
    
            saveEmployee(Employee).then((response) => {
                console.log(response.data)
                setSavedEmployee(response.data)
                navigator('/employees')
                
            }).catch()
            
        }

        
    }
  
    function validateForm(){
        let isValid = true;
        const errorCopy = {...errors}

        if(firstName.trim()){
            errorCopy.firstName = '';
        }else{
            errorCopy.firstName = 'FirstName is required!'
            isValid = false;
        }

        if(lastName.trim()){
            errorCopy.lastName = '';
        }else{
            errorCopy.lastName = 'LastName is required!'
            isValid = false;
        }

        if(emailId.trim()){
            errorCopy.emailId = '';
        }else{
            errorCopy.emailId = 'EmailId is required!'
            isValid = false;
        }

        setError(errorCopy)

        return isValid;
    }


    function pageTitle(){
        if(id){
        
            return <h2 className='text-center'>Edit Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='card'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input 
                                type='text'
                                placeholder='Enter First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${ errors.firstName ? 'is-invalid': ''}`}
                                onChange={handleFirstName}>
                            </input>
                            {errors.firstName && <div className='invalid-feedback'>{ errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input 
                                type='text'
                                placeholder='Enter Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${ errors.lastName ? 'is-invalid': ''}`}
                                onChange={handleLastName}>
                            </input>
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email Id:</label>
                            <input 
                                type='text'
                                placeholder='Enter Email Id'
                                name='emailId'
                                value={emailId}
                                className={`form-control ${ errors.emailId ? 'is-invalid': '' }`}
                                onChange={handleEmailId}>
                            </input>
                            { errors.emailId && <div className='invalid-feedback'> { errors.emailId} </div> }
                        </div>
                        <button className='btn btn-success' onClick={loadEmplpyee}>Save</button>
                        <button style={{ marginLeft: "20px" }} className='btn btn-danger' onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>

        </div>
      
    </div>
  )
}

                            
                           
export default EmployeeComponent
