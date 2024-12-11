package com.foy5.crud.controllers;

import com.foy5.crud.model.MainModel;
import com.foy5.crud.repositories.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/")
public class MainController {

    @Autowired
    private MainRepository repository;
    // Bu fonksiyon site üzerinden rastgele bir kişi resmi alır
    private String generatePersonImage() {
        return "https://thispersondoesnotexist.com/";
    }

    // Read Operation
    @GetMapping
    public String listEmployees(Model model) {
        List<MainModel> employees = repository.findAll();
        
        employees = employees.stream()
            .map(emp -> {
                if (emp.getEmpPicture() == null || emp.getEmpPicture().isEmpty()) {
                    emp.setEmpPicture(generatePersonImage());
                }
                return emp;
            })
            .collect(Collectors.toList());

        model.addAttribute("employees", employees);
        return "index";
    }
    // Kullanıcı verilerini çekmek için Endpoint ve en sonunda çekilen veriler ilgili Fragment üzerinde döndürülür
    @GetMapping("/list")
    public String listEmployeesFragment(Model model) {
        List<MainModel> employees = repository.findAll();
        
        // Eğer resim yoksa rastgele bir görsel ata
        employees = employees.stream()
            .map(emp -> {
                if (emp.getEmpPicture() == null || emp.getEmpPicture().isEmpty()) {
                    emp.setEmpPicture(generatePersonImage());
                }
                return emp;
            })
            .collect(Collectors.toList());

        model.addAttribute("employees", employees);
        return "fragments/employee-list";
    }

    //Kullanıcı düzenleme işlemi eğer kullanıcı resim belirtmediyse rastgele bir resim atar
    @GetMapping("/edit/{id}")
    public String editEmployee(@PathVariable int id, Model model) {
        Optional<MainModel> employee = repository.findById(id);
        
        if (employee.isPresent()) {
            MainModel emp = employee.get();
            if (emp.getEmpPicture() == null || emp.getEmpPicture().isEmpty()) {
                emp.setEmpPicture(generatePersonImage());
            }
            model.addAttribute("employee", emp);
        }
        
        return "fragments/employee-form";
    }

    // Create Operation
    @PostMapping("/save")
    public String saveEmployee(@ModelAttribute MainModel employee) {
        // Eğer resim yoksa rastgele bir görsel ata
        if (employee.getEmpPicture() == null || employee.getEmpPicture().isEmpty()) {
            employee.setEmpPicture(generatePersonImage());
        }

        System.out.println(employee);
       
        repository.save(employee);
        return "redirect:/";
    }
    // Delete Operation
    @PostMapping("/delete/{id}")
    public String deleteEmployee(@PathVariable int id) {
        repository.deleteById(id);
        return "redirect:/";
    }
}
