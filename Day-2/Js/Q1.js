const result = employees.reduce((acc, emp) => {
  if (!acc[emp.dept]) {
    acc[emp.dept] = {
      employees: [],
      totalSalary: 0,
      totalCount: 0
    };
  }

  acc[emp.dept].employees.push(emp.name);
  acc[emp.dept].totalSalary += emp.salary;
  acc[emp.dept].totalCount += 1;

  return acc;
}, {});

Object.keys(result).forEach(dept => {
  result[dept].avgSalary = Number(
    (result[dept].totalSalary / result[dept].totalCount).toFixed(2)
  );
  delete result[dept].totalSalary;
});

console.log(result);
