package com.example.manytomanymapping.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.manytomanymapping.models.Teacher;

public interface TeacherRepository extends CrudRepository<Teacher, Integer> {
}