package com.uni.forum.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.uni.forum.domain.entities.TopicEntity;

public interface TopicPagingRepository extends PagingAndSortingRepository<TopicEntity, Long> {
    Page<TopicEntity> findByUsername(String username, Pageable pageable);
    Page<TopicEntity> findAll(Pageable pageable);
}
