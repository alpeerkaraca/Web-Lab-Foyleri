package com.foy5.crud.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "employee")
public class MainModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer empID;

    @Column(nullable = false)
    public String empName;

    @Column(nullable = false)
    public String empEmail;

    @Column(nullable = false, length = 14)
    public String empPhone;

    @Column(nullable = false)
    public String empDepartment;

    @Column(nullable = false)
    public String empRole;

    @Column(nullable = false)
    public String empPicture = "https://thispersondoesnotexist.com/";
    //.....

    public Integer getEmpID() {
        return empID;
    }

    public void setEmpID(Integer empID) {
        this.empID = empID;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getEmpEmail() {
        return empEmail;
    }

    public void setEmpEmail(String empEmail) {
        this.empEmail = empEmail;
    }

    public String getEmpPhone() {
        return empPhone;
    }

    public void setEmpPhone(String empPhone) {
        this.empPhone = empPhone;
    }

    public String getEmpDepartment() {
        return empDepartment;
    }

    public void setEmpDepartment(String empDepartment) {
        this.empDepartment = empDepartment;
    }

    public String getEmpRole() {
        return empRole;
    }

    public void setEmpRole(String empRole) {
        this.empRole = empRole;
    }

    public String getEmpPicture() {
        return empPicture;
    }

    public void setEmpPicture(String empPicture) {
        this.empPicture = empPicture;
    }

    @Override
    public String toString() {
        return "MainModel [empDepartment=" + empDepartment + ", empEmail=" + empEmail + ", empID=" + empID
                + ", empName="
                + empName + ", empPhone=" + empPhone + ", empRole=" + empRole + "]";
    }

}
