//package com.project.delivery.dto;
//
//import lombok.Data;
//
//@Data
//public class RegisterRequest {
//    private String name;
//    private String email;
//    private String password;
//    private String role;
//
//    public String getName() { return name; }
//    public String getEmail() { return email; }
//    public String getPassword() { return password; }
//    public String getRole() { return role; }
//
//    public void setName(String name) { this.name = name; }
//    public void setEmail(String email) { this.email = email; }
//    public void setPassword(String password) { this.password = password; }
//    public void setRole(String role) { this.role = role; }
//}

package com.project.delivery.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Role is required")
    private String role;

    // GETTERS & SETTERS

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
