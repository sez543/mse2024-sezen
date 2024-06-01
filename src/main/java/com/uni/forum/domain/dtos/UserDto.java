package com.uni.forum.domain.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String username;
    // TODO: make email unique
    private String email;
    private String password;
    private String name;
    private String role;

}
