package com.botteon.tictactoe_api;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String xPlayerName;
    private String oPlayerName;
    private String result;
    private LocalDateTime playedAt;

    public Game() {
    }

    public Game(String xPlayerName, String oPlayerName, String result) {
        this.xPlayerName = xPlayerName;
        this.oPlayerName = oPlayerName;
        this.result = result;
        this.playedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getXPlayerName() {
        return xPlayerName;
    }

    public String getOPlayerName() {
        return oPlayerName;
    }

    public String getResult() {
        return result;
    }

    public LocalDateTime getPlayedAt() {
        return playedAt;
    }

    public void setXPlayerName(String xPlayerName) {
        this.xPlayerName = xPlayerName;
    }

    public void setOPlayerName(String oPlayerName) {
        this.oPlayerName = oPlayerName;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
