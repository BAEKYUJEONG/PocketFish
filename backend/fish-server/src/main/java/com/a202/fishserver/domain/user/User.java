package com.a202.fishserver.domain.user;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class User {

    @Id
    private long id;

    @Column
    private String email;

    @Column
    private String nickname;

    @Column
    private String picture;

    @Column
    private boolean flag;

    public User (long id) {
        this.id = id;
    }

    @Builder
    public User(long id, String nickname, String email, String picture, boolean flag) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.picture = picture;
        this.flag = flag;
    }
}
