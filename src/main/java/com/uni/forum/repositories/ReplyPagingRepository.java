package com.uni.forum.repositories;

import com.uni.forum.domain.entities.ReplyEntity;
import com.uni.forum.domain.entities.TopicEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

// TODO: add paging support (PagingAndSortingRepository)
public interface ReplyPagingRepository extends PagingAndSortingRepository<ReplyEntity, Long> {

    List<ReplyEntity> findAllByTopic(TopicEntity topicEntity, Pageable pageable);

}
