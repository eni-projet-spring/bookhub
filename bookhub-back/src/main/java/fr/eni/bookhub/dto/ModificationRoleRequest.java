package fr.eni.bookhub.dto;

import fr.eni.bookhub.entity.Role;
import jakarta.validation.constraints.NotNull;

public class ModificationRoleRequest {

    @NotNull
    private Role role;

    public ModificationRoleRequest() {
    }

    public ModificationRoleRequest(Role role) {
        this.role = role;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}