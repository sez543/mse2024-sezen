package com.uni.forum.domain.coverters;

import com.uni.forum.domain.dtos.ReplyDto;
import com.uni.forum.domain.dtos.TopicDto;
import com.uni.forum.domain.entities.ReplyEntity;
import com.uni.forum.domain.entities.TopicEntity;
import org.mapstruct.MapMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ReplyConverter {

    ReplyEntity toEntity(ReplyDto dto);


    @Mapping(source = "topic.id", target = "topicId")
    ReplyDto toDto(ReplyEntity dto);

}
