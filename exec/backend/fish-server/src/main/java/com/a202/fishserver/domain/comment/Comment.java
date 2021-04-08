package com.a202.fishserver.domain.comment;

import com.a202.fishserver.domain.user.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.*;
import java.util.Date;
import com.a202.fishserver.domain.collection.Collection;

@Entity
@Getter
@Setter
@ToString
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String content;

    @Temporal(TemporalType.DATE)
    @Column
    private Date reg_date;

    @Temporal(TemporalType.DATE)
    @Column
    private Date updated_at;

    @Column
    private boolean flag;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn()
    private Collection collection;

}
