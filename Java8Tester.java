package commonproject;

import java.util.Optional;

public class Java8Tester  {

	   public static void main(String args[]) {
	      Java8Tester java8Tester = new Java8Tester();
	      Integer value1 = null;
	      Integer value2 = new Integer(10);
			
	      //Optional.ofNullable - allows passed parameter to be null.
	      Optional<Integer> valueCk1 = Optional.ofNullable(value1);
			
	      //Optional.of - throws NullPointerException if passed parameter is null
	      Optional<Integer> valueCk2 = Optional.of(value2);
	      System.out.println(java8Tester.sum(valueCk1,valueCk1));
	   }
		
	   public Integer sum(Optional<Integer> valueCk1, Optional<Integer> valueCk2) {
	      //Optional.isPresent - checks the value is present or not
			
	      System.out.println("First parameter is present: " + valueCk1.isPresent());
	      System.out.println("Second parameter is present: " + valueCk1.isPresent());
			
	      //Optional.orElse - returns the value if present otherwise returns
	      //the default value passed.
	      Integer value1 = valueCk1.orElse(new Integer(0));
			
	      //Optional.get - gets the value, value should be present
	      Integer value2 = valueCk1.get();
	      return value1 + value2;
	   }
	}