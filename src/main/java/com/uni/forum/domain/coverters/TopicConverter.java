package com.uni.forum.domain.coverters;

import com.uni.forum.domain.dtos.TopicDto;
import com.uni.forum.domain.entities.TopicEntity;
import org.mapstruct.Mapper;

@Mapper
public interface TopicConverter {

    TopicEntity toEntity(TopicDto dto);
    TopicDto toDto(TopicEntity dto);

}
