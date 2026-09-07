import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee } from '../Services/EmployeeService'
import { getEmployeeById } from '../Services/EmployeeService'
import { useEffect } from 'react'
import { updateEmployee } from '../Services/EmployeeService'



const EmployeeComponent = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then(response => {
          const { firstName, lastName, email } = response.data;

          setFirstName(firstName);
          setLastName(lastName);
          setEmail(email);
        })
        .catch(error => {
          console.log("Something went wrong", error);
        });
    }
  }, [id]);

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Update Employee</h2>
    } else{
      return<h2 className='text-center'>Add Employee</h2>
    }
  }
   
    function saveOrUpdateEmployee(e){
      e.preventDefault()

      if (validateForm()) {
        const employee={firstName,lastName,email}
        console.log(employee)

      if(id){
        updateEmployee(id,employee).then(response=>{
          console.log("Employee updated successfully",response.data)
          navigate('/employees')
        }).catch(error=>{
          console.log("Something went wrong",error)
        })
      } 
      
      else {  
        createEmployee(employee)
        .then(response=>{
            console.log("Employee added successfully",response.data)
          navigate('/employees')
        })
        .catch(error=>{
            console.log("Something went wrong",error)
        })
      }
    }
  }
  

    function validateForm() {

      let valid=true;
      const newErrors = {...errors}; 

      if (firstName.trim()) {
            newErrors.firstName = '';}

            else{
                  newErrors.firstName = 'First name is required';
                  valid = false;
            }
        
      
      if (lastName.trim()) {
        newErrors.lastName = '';}
      else {
        newErrors.lastName = 'Last name is required';
        valid = false;
      }


      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.trim()) {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!emailPattern.test(email.trim())) {
        newErrors.email = 'Please enter a valid email address';
        valid = false;
      } else {
        newErrors.email = '';
      }
    
      setErrors(newErrors);

      return valid;

    }
      
    

  return (
     <div className='container'>

      <br></br> 

        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
             {pageTitle()}
              <div className='card-body'>

                <form onSubmit={saveOrUpdateEmployee} noValidate>

                  <div className='form-group mb-2'>

                    <label className='form-label'>First Name :</label>


                    <input 
                    type="text"
                    placeholder='Enter Employee First Name'
                    name='firstName'
                    value={firstName}
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    onChange={e => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}

                  </div>

                 <div className='form-group mb-2'>

                    <label className='form-label'>Last Name :</label>


                    <input 
                    type="text"
                    placeholder='Enter Employee Last Name'
                    name='lastName'
                    value={lastName}
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    onChange={e => setLastName(e.target.value)}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}

                  </div>


                  <div className='form-group mb-2'>

                    <label className='form-label'>Email :</label>


                    <input 
                    type="email"
                    placeholder='Enter Employee Email'
                    name='email'
                    value={email}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className='employee-form-actions'>
                    <button
                      className='btn btn-light border'
                      type='button'
                      onClick={() => navigate('/employees')}
                    >
                      Back to employees
                    </button>
                    <button className='btn btn-success' type='submit'>
                      {id ? 'Update employee' : 'Add employee'}
                    </button>
                  </div>

                </form>

            



              </div>

                    
                     </div>
              </div>
    </div>
  )
  }
export default EmployeeComponent    
