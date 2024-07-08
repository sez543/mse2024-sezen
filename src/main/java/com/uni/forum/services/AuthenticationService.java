package com.uni.forum.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.uni.forum.Enum.Role;
import com.uni.forum.api.UserRest;
import com.uni.forum.domain.coverters.UserConverter;
import com.uni.forum.domain.dtos.LoginUserDto;
import com.uni.forum.domain.dtos.RegisterUserDto;
import com.uni.forum.domain.dtos.UserDto;
import com.uni.forum.domain.entities.RoleEntity;
import com.uni.forum.domain.entities.UserEntity;
import com.uni.forum.exceptions.ExistingEntityException;
import com.uni.forum.repositories.RoleRepository;
import com.uni.forum.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserConverter userConverter;
    private final RoleRepository roleRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(UserRest.class);

    public UserEntity signup(RegisterUserDto input) {
        Optional<RoleEntity> optionalRole = roleRepository.findByName(Role.USER);

        if (optionalRole.isEmpty()) {
            return null;
        }

        UserDto user = new UserDto();
        user.setName(input.getFullName());
        user.setEmail(input.getEmail());
        user.setUsername(input.getUsername());
        user.setPassword(passwordEncoder.encode(input.getPassword()));

        user.setRole(optionalRole.get());

        UserDto persist;

        try {
            persist = userService.persist(user);
        } catch (ExistingEntityException e) {
            LOGGER.warn("User with username {} already exists", user.getUsername());
            LOGGER.warn("Root cause: ", e);
            return null;
        }

        return userConverter.toEntity(persist);
    }

    public UserEntity authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()));

        return userRepository.findByUsername(input.getUsername()).orElseThrow();
    }

    public List<UserEntity> allUsers() {
        List<UserEntity> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
}