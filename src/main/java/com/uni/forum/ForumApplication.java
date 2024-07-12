package com.uni.forum;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.uni.forum.Enum.Role;
import com.uni.forum.domain.dtos.UserDto;
import com.uni.forum.domain.entities.RoleEntity;
import com.uni.forum.repositories.RoleRepository;
import com.uni.forum.services.UserService;

import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
public class ForumApplication {
	private final UserService userService;

	@Value("${admin.user.password}")
	private String adminUserPassword;

	@Value("${admin.user.username}")
	private String adminUserUsername;

	@Value("${admin.user.email}")
	private String adminUserEmail;

	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ForumApplication.class, args);
	}

	@Bean
	@ConditionalOnProperty(name = "app.runner.enabled", havingValue = "true")
	public CommandLineRunner conditionalRunner() {
		return args -> {
			String encodedPassword = passwordEncoder.encode(adminUserPassword);
			Optional<RoleEntity> optionalRole = roleRepository.findByName(Role.ADMIN);

			if (optionalRole.isEmpty()) {
				return;
			}

			RoleEntity role = optionalRole.get();
			UserDto admin = new UserDto(adminUserUsername, adminUserEmail, encodedPassword, "Admin Admin", role);
			userService.delete(admin);
			userService.persist(admin);
			System.out.println("Conditional CommandLineRunner running!");
		};
	}
}
