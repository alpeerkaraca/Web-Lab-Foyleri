package com.foy5.crud.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.foy5.crud.model.MainModel;
public interface MainRepository extends JpaRepository<MainModel, Integer> {
    
}
