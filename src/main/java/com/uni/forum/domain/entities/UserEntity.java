package com.uni.forum.domain.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

// TODO: create a base entity that contain date created, date modified, id
@NoArgsConstructor
@Getter
@Setter
@Entity
public class UserEntity extends BaseEntity {

    @Column(unique = true)
    private String username;
    private String email;
    private String password;
    private String name;
    private String role;

    @Column
    @OneToMany(mappedBy = "user")
    private Set<ReplyEntity> replies;

    @Column
    @OneToMany(mappedBy = "user")
    private Set<TopicEntity> topics;
}
