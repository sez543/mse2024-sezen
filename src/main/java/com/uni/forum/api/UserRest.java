package com.uni.forum.api;

import com.uni.forum.domain.dtos.UserDto;
import com.uni.forum.services.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// TODO: exception handling to not show backend errors
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserRest {

  private final UserService userService;

  @GetMapping(path = "/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
  @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
  public ResponseEntity<UserDto> getUser(@PathVariable String username) {
    return ResponseEntity.ok(userService.findByEmail(username));
  }

  @PutMapping(path = "/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
  @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
  public ResponseEntity<UserDto> updateUser(
      @PathVariable String username, @RequestBody UserDto user) {
    return ResponseEntity.ok(userService.updateUser(username, user));
  }

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
  public ResponseEntity<List<UserDto>> getAllUsers(
      @RequestParam(value = "page", required = false) Integer page,
      @RequestParam(value = "pageSize", required = false) Integer pageSize) {
    // TODO: add check for NULL page and pageSize
    return ResponseEntity.ok(userService.getAllUsers(page, pageSize));
  }

}
