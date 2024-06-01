package com.uni.forum.domain.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ReplyEntity extends BaseEntity {

  @Column(unique = true)
  private String text;

  private String username;

  @JoinColumn
  @ManyToOne
  private TopicEntity topic;

  @JoinColumn
  @ManyToOne
  private UserEntity user;
}
