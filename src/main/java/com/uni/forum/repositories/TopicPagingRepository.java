package com.uni.forum.repositories;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.uni.forum.domain.entities.TopicEntity;

public interface TopicPagingRepository extends PagingAndSortingRepository<TopicEntity, Long> {
    List<TopicEntity> findByUsername(String username, Pageable pageable);
}
