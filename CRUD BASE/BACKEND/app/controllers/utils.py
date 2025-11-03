"""Helper utilities shared across controller modules."""

from sqlalchemy.exc import SQLAlchemyError

from app import db


def commit_session() -> None:
    """Commits the current session ensuring rollback on failure."""
    try:
        db.session.commit()
    except SQLAlchemyError as exc:
        db.session.rollback()
        raise ValueError('Erro ao persistir no banco de dados.') from exc
