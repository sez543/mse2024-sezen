package com.uni.forum.repositories;

import com.uni.forum.Enum.Role;
import com.uni.forum.domain.entities.RoleEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<RoleEntity, Integer> {
    Optional<RoleEntity> findByName(Role name);
}
