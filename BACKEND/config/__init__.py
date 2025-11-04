"""Compatibility layer that re-exports database configurations."""
from database import Config, DevelopmentConfig, ProductionConfig  # noqa: F401

__all__ = ["Config", "DevelopmentConfig", "ProductionConfig"]
