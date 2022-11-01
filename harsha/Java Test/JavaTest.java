package com;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

public class JavaTest {
	public static void main(String[] args) {
		Employee emp1 = new Employee(1, "Mohit", 423443);
		Employee emp2 = new Employee(2, "Rahul", 4335656);
		Employee emp3 = new Employee(3, "Shyam", 45443);
		Employee emp4 = new Employee(4, "Mohit", 878788);
		Employee emp5 = new Employee(5, "Swaraj", 767755);
		Employee emp6 = new Employee(6, "Shyam", 45443);
		Employee emp7 = new Employee(7, "Anish", 35546);

		List<Employee> empList = new ArrayList<>(10);
		empList.add(emp1);
		empList.add(emp2);
		empList.add(emp3);
		empList.add(emp4);
		empList.add(emp5);
		empList.add(emp6);
		empList.add(emp7);

		displayEmployeesBySimpleForLoop(empList);
		displayEmployeesByForEach(empList);
		displayEmployeesByIterator(empList);
		List<Employee> sortedEmpList = sortEmpByNameAndSalary(empList);
		System.out.println(sortedEmpList);
		List<Employee> sortedEmpList1 = sortEmpByName(empList);
		System.out.println(sortedEmpList1);
		List<Employee> sortedEmpList2 = sortEmpBySalary(empList);
		System.out.println(sortedEmpList2);
		
		int empId = 1;
		Employee empRemoved = removeById(empList, empId);
		System.out.println(empRemoved);
		HashMap<String, Employee> empMap = convertListToMap(empList);
		displayEmpMap(empMap);
		String nameOfTheEmp = "Mohit";
		removeByNameFromMap(empMap, nameOfTheEmp);
		List<Employee> empListWithoutDuplicate = removeDuplicateEntriesFromList(empList);
		System.out.println(empListWithoutDuplicate);
	}

	/**
	 * Use simple for loop
	 * 
	 * for(int i =0 ; i<size; i++){
	 * 
	 * }
	 * 
	 * @param empList
	 */
	private static void displayEmployeesBySimpleForLoop(List<Employee> empList) {
		System.out.println("========== Display Employees By Simple ForLoop ==========");
		for (int i = 0; i < empList.size(); i++) {
			System.out.println(empList.get(i));
		}
	}

	/**
	 * Use For each loop for(Double obj : list){
	 * 
	 * }
	 * 
	 * @param empList
	 */
	private static void displayEmployeesByForEach(List<Employee> empList) {
		System.out.println("============= Display Employees By ForEach ============");
		for (Employee employee : empList) {
			System.out.println(employee);
		}
	}

	/**
	 * Use iterator Iterator iterator = list.iterator();
	 * 
	 * @param empList
	 */
	private static void displayEmployeesByIterator(List<Employee> empList) {
		System.out.println("============= Display Employees By Iterator ==============");
		Iterator<Employee> employee = empList.iterator();
		while (employee.hasNext()) {
			System.out.println(employee.next());
		}
	}

	/**
	 * This method will return a sorted list of employees based name and is name are
	 * then by salary
	 * 
	 * @param empList
	 * @return
	 */
	private static List<Employee> sortEmpByNameAndSalary(List<Employee> empList) {
		System.out.println("=========== Sort Employees By Name And Salary ============");
		empList.sort(Comparator.comparing(Employee::getName).
				thenComparing(Employee::getSalary));;
		return empList;
	}

	/**
	 * Use comparator
	 * 
	 * @param empList
	 * @return
	 */
	private static List<Employee> sortEmpBySalary(List<Employee> empList) {
		System.out.println("=============== Sort Employees By Salary ================");
		List<Employee> employeesSortedBySalary = empList.stream()
				  .sorted(Comparator.comparing(Employee::getSalary).reversed())
				  .collect(Collectors.toList());
		return employeesSortedBySalary;
	}

	/**
	 * Use comparator
	 * 
	 * @param empList
	 * @return
	 */
	private static List<Employee> sortEmpByName(List<Employee> empList) {
		System.out.println("============== Sort Employees By Name ===============");
		List<Employee> sortedEmployeesByName = empList.stream()
				  .sorted(Comparator.comparing(Employee::getName))
				  .collect(Collectors.toList());
		return sortedEmployeesByName;
	}

	/**
	 * This will remove and return the removed element based on id
	 * 
	 * @param empList
	 * 
	 * @param empId
	 * @return
	 */
	private static Employee removeById(List<Employee> empList, int empId) {
		System.out.println("============ Remove Employee By Id =============");
		Employee empRemoved = null;
		for (int i = 0; i < empList.size(); i++) {
			if (empList.get(i).getId() == empId) {
				empRemoved = empList.remove(i);
			}
		}
		return empRemoved;
	}

	/**
	 * Create a map using the list, assign keys as names of the employee and value
	 * as the employee object
	 * 
	 * @param empList
	 * @return
	 */
	private static HashMap<String, Employee> convertListToMap(List<Employee> empList) {
		HashMap<String, Employee> hashMap = new HashMap<String, Employee>();
		for (Employee employee : empList) {
			hashMap.put(employee.getName(), employee);
		}
		return hashMap;
	}

	/**
	 * 
	 * Iterate the whole map and print botth keys and values
	 * 
	 * @param empMap
	 */
	private static void displayEmpMap(HashMap<String, Employee> empMap) {
		System.out.println("========= Display Employees HashMap with key and value ==========");
		for (Entry<String, Employee> employeeMap : empMap.entrySet()) {
			System.out.print(employeeMap);
		}
	}

	/**
	 * Remove all the entries from the map where emp name is "Mohit"
	 * 
	 * @param empMap
	 * @param nameOfTheEmp
	 */
	private static void removeByNameFromMap(HashMap<String, Employee> empMap, String nameOfTheEmp) {
		System.out.println("=========== Remove Em By Name From Map ============");
		empMap.remove(nameOfTheEmp);
	}

	/**
	 * Remove all the duplicate entries from the list and return the list .
	 * 
	 * @param empList
	 * @return
	 */
	private static List<Employee> removeDuplicateEntriesFromList(List<Employee> empList) {
		System.out.println("============= Remove Duplicate Entries From List =============");
		List<Employee> uniqueEmployeeList = empList.stream().distinct().collect(Collectors.toList());
		
		return uniqueEmployeeList;
	}
}