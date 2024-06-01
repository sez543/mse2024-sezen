package com.uni.forum.repositories;

import com.uni.forum.domain.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// TODO: add paging support (PagingAndSortingRepository)
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);
}
