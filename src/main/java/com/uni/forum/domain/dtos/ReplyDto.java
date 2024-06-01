package com.uni.forum.domain.dtos;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReplyDto {

    // Input params
    private String text;
    private String username;
    private Long topicId;

    // Those are in order to return the timestamps of the created entities
    private Date created;
    private Date modified;

}
