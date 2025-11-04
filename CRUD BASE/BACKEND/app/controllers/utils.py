"""Shared utilities for controllers."""
from sqlalchemy.exc import SQLAlchemyError

from app import db


def commit_session() -> None:
    """Commit the current DB session and rollback on errors.

    Raises ValueError on persistence errors so route handlers can return 400.
    """
    try:
        db.session.commit()
    except SQLAlchemyError as exc:
        db.session.rollback()
        raise ValueError("Erro ao persistir no banco de dados.") from exc
