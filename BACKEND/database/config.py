"""Database configuration module for the backend."""
from __future__ import annotations

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
INSTANCE_DIR = BASE_DIR / "instance"
INSTANCE_DIR.mkdir(parents=True, exist_ok=True)


def sqlite_uri(filename: str = "banco_de_dados.db") -> str:
    """Return the SQLite URI pointing to the instance directory."""
    return f"sqlite:///{INSTANCE_DIR / filename}"


class Config:
    """Shared configuration defaults."""

    SECRET_KEY = os.environ.get("SECRET_KEY", "super-secret-key")
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    """Development preset: debug enabled and local SQLite instance."""

    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get("DEV_DATABASE_URL", sqlite_uri())


class ProductionConfig(Config):
    """Production preset: prefer external database if provided."""

    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", sqlite_uri())
