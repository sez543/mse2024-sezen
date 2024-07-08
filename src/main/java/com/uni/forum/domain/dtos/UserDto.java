package com.uni.forum.domain.dtos;

import com.uni.forum.domain.entities.RoleEntity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String username;
    private String email;
    private String password;
    private String name;
    private RoleEntity role;

}
