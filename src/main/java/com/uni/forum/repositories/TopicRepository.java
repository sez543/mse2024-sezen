package com.uni.forum.repositories;

import com.uni.forum.domain.entities.TopicEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<TopicEntity, Long> {

    Optional<TopicEntity> findByTitle(String title);

    Optional<TopicEntity> findById(Long id);
}
