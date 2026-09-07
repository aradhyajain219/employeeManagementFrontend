import React, { useState, useEffect } from 'react'
import { deleteEmployee as deleteEmployeeById, listEmployees } from '../Services/EmployeeService'
import { useNavigate } from 'react-router-dom'

export default function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    getAllEmployees()
   
  }, [])

  function getAllEmployees() {
     listEmployees()
      .then((response) => {
        setEmployees(Array.isArray(response?.data) ? response.data : [])
      })
      .catch((error) => {
        console.error(error)
        setEmployees([])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function addNewEmployee() {
    navigate('/add-employee')
  }

  function updateEmployee(id){
     navigate(`/update-employee/${id}`)
  }

  function confirmDeleteEmployee() {
    if (!employeeToDelete) return

    setIsDeleting(true)
    deleteEmployeeById(employeeToDelete.id)
      .then((response) => {
        console.log("Employee deleted successfully", response.data)
        setEmployees((currentEmployees) =>
          currentEmployees.filter((employee) => employee.id !== employeeToDelete.id)
        )
        setEmployeeToDelete(null)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsDeleting(false)
      })
  }

  return (  
    <main className='dashboard-page'>
      <div className='container dashboard-container'>
        <section className='dashboard-heading'>
          <div>
            <p className='dashboard-eyebrow'>People operations</p>
            <h1>Good morning, team.</h1>
            <p className='dashboard-subtitle'>Keep your employee directory clear, current, and connected.</p>
          </div>
          <button className='btn dashboard-add-button' onClick={addNewEmployee}>
            <span className='button-plus' aria-hidden='true'>+</span>
            Add employee
          </button>
        </section>

        <section className='dashboard-stats' aria-label='Employee summary'>
          <div className='summary-card summary-card-primary'>
            <span className='summary-label'>Total employees</span>
            <strong>{loading ? '-' : employees.length}</strong>
            <span className='summary-note'>In your directory</span>
          </div>
          <div className='summary-card'>
            <span className='summary-label'>Directory status</span>
            <strong className='status-value'><span className='status-dot'></span>{loading ? 'Loading' : 'Active'}</strong>
            <span className='summary-note'>Data is up to date</span>
          </div>
          <div className='summary-card'>
            <span className='summary-label'>Quick action</span>
            <strong className='summary-action'>Add someone new</strong>
            <button className='summary-link' onClick={addNewEmployee}>Open employee form <span aria-hidden='true'>-&gt;</span></button>
          </div>
        </section>

        <section className='directory-panel'>
          <div className='directory-heading'>
            <div>
              <p className='dashboard-eyebrow'>Directory</p>
              <h2>All employees</h2>
            </div>
            <span className='directory-count'>{employees.length} records</span>
          </div>

          {loading ? (
            <div className='directory-empty'>Loading employees...</div>
          ) : (
            <div className='table-responsive'>
              <table className='table directory-table'>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Employee ID</th>
                    <th>Email address</th>
                    <th className='text-end'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length > 0 ? (
                    employees.map((employee) => (
                      <tr key={employee.id || employee.email}>
                        <td>
                          <div className='employee-cell'>
                            <span className='employee-avatar'>{employee.firstName?.charAt(0)}{employee.lastName?.charAt(0)}</span>
                            <span><strong>{employee.firstName} {employee.lastName}</strong><small>Team member</small></span>
                          </div>
                        </td>
                        <td><span className='employee-id'>#{employee.id}</span></td>
                        <td>{employee.email}</td>
                        <td className='text-end'>
                          <button className='btn btn-sm btn-outline-secondary action-button' onClick={() => updateEmployee(employee.id)}>
                            Update
                          </button>
                          <button className='btn btn-sm btn-outline-danger action-button' onClick={() => setEmployeeToDelete(employee)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='4' className='directory-empty'>No employees found. Add your first team member to get started.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {employeeToDelete && (
        <div className='modal fade show d-block' tabIndex='-1' role='dialog' aria-modal='true'>
          <div className='modal-dialog modal-dialog-centered' role='document'>
            <div className='modal-content shadow'>
              <div className='modal-header'>
                <h5 className='modal-title'>Delete employee?</h5>
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={() => setEmployeeToDelete(null)}
                  disabled={isDeleting}
                ></button>
              </div>
              <div className='modal-body'>
                <p className='mb-1'>You are about to permanently delete:</p>
                <strong>
                  {employeeToDelete.firstName} {employeeToDelete.lastName}
                </strong>
                <p className='text-muted mb-0'>{employeeToDelete.email}</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-light border'
                  onClick={() => setEmployeeToDelete(null)}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={confirmDeleteEmployee}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete employee'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {employeeToDelete && <div className='modal-backdrop fade show'></div>}
    </main>
  )
}
