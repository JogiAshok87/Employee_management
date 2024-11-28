
const employeeForm = document.getElementById('employee-form');
const employeeList = document.getElementById('employee-list');
const searchInput = document.getElementById('search');
const registrationPage = document.getElementById('registration-page');
const listingPage = document.getElementById('listing-page');
const registerPageLink = document.getElementById('register-page');
const listingPageLink = document.getElementById('listing-page');

//operations on local stroage
const getEmployees = () => JSON.parse(localStorage.getItem('employees') || '[]');
const saveEmployees = (employees) => localStorage.setItem('employees', JSON.stringify(employees));

// registering new employee
employeeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newEmployee = {
    name: document.getElementById('name').value,
    position: document.getElementById('position').value,
    about: document.getElementById('about').value,
    joining_date: document.getElementById('joining_date').value,
  };

  const employees = getEmployees();
  employees.push(newEmployee);
  saveEmployees(employees);

  employeeForm.reset();
  switchPage('listing-page');
  renderEmployeeList();
});

// Render Employee List
const renderEmployeeList = () => {
  const employees = getEmployees();
  console.log(employees)
  if (employees.length === 0) {
    employeeList.innerHTML = '<tr><td colspan="5">No employees found.</td></tr>';
    return;
  }
  employeeList.innerHTML = employees
    .map(
      (emp, idx) => `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.position}</td>
        <td>${emp.about}</td>
        <td>${emp.joining_date}</td>
        <td><button onclick="deleteEmployee(${idx})" style="padding:5px 10px">Delete</button></td>
      </tr>
    `
    )
    .join('');
    console.log('Employee list updated',employeeList.innerHTML)
};

// Delete Employee
window.deleteEmployee = (idx) => {
  const employees = getEmployees();
  employees.splice(idx, 1);
  saveEmployees(employees);
  renderEmployeeList();
};

// Search Employees
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const employees = getEmployees().filter((emp) =>
    emp.name.toLowerCase().includes(query)
  );

  employeeList.innerHTML = employees
    .map(
      (emp) => `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.position}</td>
        <td>${emp.about}</td>
        <td>${emp.joining_date}</td>
      </tr>
    `
    )
    .join('');
    
});

const switchPage = (page) => {
    document.querySelectorAll('.page').forEach((el) => el.classList.add('hidden'));
    document.getElementById(page).classList.remove('hidden');
  };
  
  registerPageLink.addEventListener('click', () => switchPage('registration-page'));
  listingPageLink.addEventListener('click', () => {
    switchPage('listing-page');
    renderEmployeeList();
  });





// Initialize
switchPage('registration-page');
renderEmployeeList();
