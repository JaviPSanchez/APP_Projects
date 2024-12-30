"""
Test custom Django management commands.
"""
# Mock behabiour of the DataBase
from unittest.mock import patch

# Custom Errors
from psycopg2 import OperationalError as Psycopg2OpError

from django.core.management import call_command
from django.db.utils import OperationalError
# With no Database, no migration need it!
from django.test import SimpleTestCase


@patch('core.management.commands.wait_for_db.Command.check')
class CommandTests(SimpleTestCase):
    """Test commands."""

    def test_wait_for_db_ready(self, patched_check):
        """Test waiting for database if database ready."""
        # We just want to return True
        patched_check.return_value = True

        call_command('wait_for_db')

        # Only one call
        patched_check.assert_called_once_with(databases=['default'])

    # We want to wait between each call
    @patch('time.sleep')
    def test_wait_for_db_delay(self, patched_sleep, patched_check):
        """Test waiting for database when getting OperationalError."""
        patched_check.side_effect = [Psycopg2OpError] * 2 + [OperationalError] * 3 + [True]

        call_command('wait_for_db')

        # We expect only call th DB 6 times
        self.assertEqual(patched_check.call_count, 6)
        # Multiple calls
        patched_check.assert_called_with(databases=['default'])