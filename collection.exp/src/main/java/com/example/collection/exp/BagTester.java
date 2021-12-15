package com.example.collection.exp;

import org.apache.commons.collections4.Bag;
import org.apache.commons.collections4.bag.HashBag;

import com.example.collection.exp.model.Product;

import lombok.extern.slf4j.Slf4j;
@Slf4j
public class BagTester  {
	
	public static void main(String[] args) {
		
		  Bag<Product> bag = new HashBag<>();
		  Product product=new Product(1,"aa",55.55f);
	      bag.add(product, 2);
	      log.info("bags "+ bag);
		
	}

}
