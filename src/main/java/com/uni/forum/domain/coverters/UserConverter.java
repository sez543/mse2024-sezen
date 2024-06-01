package com.uni.forum.domain.coverters;

import com.uni.forum.domain.dtos.UserDto;
import com.uni.forum.domain.entities.UserEntity;
import org.mapstruct.Mapper;

@Mapper
public interface UserConverter {

    UserEntity toEntity(UserDto dto);
    UserDto toDto(UserEntity dto);

}
