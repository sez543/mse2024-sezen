package com.uni.forum.repositories;

import com.uni.forum.domain.entities.UserEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

// TODO: add paging support (PagingAndSortingRepository)
public interface UserPagingRepository extends PagingAndSortingRepository<UserEntity, Long> {
}
