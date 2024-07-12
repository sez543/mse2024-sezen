package com.uni.forum.repositories;

import com.uni.forum.domain.entities.ReplyEntity;
import com.uni.forum.domain.entities.TopicEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ReplyPagingRepository extends PagingAndSortingRepository<ReplyEntity, Long> {

    Page<ReplyEntity> findAllByTopic(TopicEntity topicEntity, Pageable pageable);
    Page<ReplyEntity> findAllBy(Pageable pageable);

}
