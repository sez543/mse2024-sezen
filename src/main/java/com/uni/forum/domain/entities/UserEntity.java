package com.uni.forum.domain.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

// TODO: create a base entity that contain date created, date modified, id
@NoArgsConstructor
@Getter
@Setter
@Entity
public class UserEntity extends BaseEntity implements UserDetails {

    @Column(unique = true)
    private String username;
    @Column(unique = true)
    private String email;
    private String password;
    private String name;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false, unique = false)
    private RoleEntity role;

    @Column
    @OneToMany(mappedBy = "user")
    private Set<ReplyEntity> replies;

    @Column
    @OneToMany(mappedBy = "user")
    private Set<TopicEntity> topics;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.getName().toString());
        return List.of(authority);
    }
}
