package com.uni.forum;

import org.testcontainers.containers.PostgreSQLContainer;

public class ForumContainer extends PostgreSQLContainer<ForumContainer> {
    private static final String IMAGE_VERSION = "postgres:16.2.1";
    private static ForumContainer container;

    private ForumContainer() {
        super(IMAGE_VERSION);
    }

    public static ForumContainer getInstance() {
        if (container == null) {
            container = new ForumContainer();
        }
        return container;
    }

    @Override
    public void start() {
        super.start();
        System.setProperty("DB_URL", container.getJdbcUrl());
        System.setProperty("DB_USERNAME", container.getUsername());
        System.setProperty("DB_PASSWORD", container.getPassword());
    }

    @Override
    public void stop() {
        //do nothing, JVM handles shut down
    }
}
